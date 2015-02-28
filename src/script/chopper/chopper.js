/* jshint node:true */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["../utl/formatting"], function(fmt) {
    "use strict";

    var MIN_SPEED     = 60; // words per minute
    var DEFAULT_SPEED = 300; // words per minute
    var MAX_SPEED     = 600; // words per minute

    var MIN_DELAY               = 100;
    var LETTER_DELAY            = 30;
    var CJK_DELAY               = 250;
    var NUMBER_DELAY            = 50;
    var CAPITALS_DELAY          = 50;
    var QUOTE_DELAY             = 40;
    var BRACKET_DELAY           = 100;
    var SHORT_PUNCTUATION_DELAY = 180;
    var LONG_PUNCTUATION_DELAY  = 250;
    var SENTENCE_END_DELAY      = 400;
    var PARAGRAPH_END_DELAY     = 250;

    var MILLISECONDS_PER_MINUTE = 60000; //milliseconds
    var MAX_SKIP_AHEAD          = 69; // words

    /*
     * SPACES_RE includes all spaces as mentioned in
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
     * under \s, except the non-breaking space character, which is misused
     * in the time algorithm.
     */
    var SPACES_RE = new RegExp("[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+");
    var SENTENCE_END_CHARS = "\.\?!\u3002\uFF1F";
    var SENTENCE_END_RE    = new RegExp("["+SENTENCE_END_CHARS+"]");
    var PARAGRAPH_END_RE   = new RegExp("\u00A0");

    /*
     * Picture scripts (e.g. Chinese, Korean) need a different treatment.
     * These unicode code pointranges come from
     * http://www.unicode.org/Public/UCD/latest/ucd/Scripts.txt
     *
     * Japanese Hiragana and Katakana have been skipped intentionally as
     * these are actually phonetic scripts
     *
     */
    var HAN_CHAR  = "\u2E80-\u2E99|\u2E9B-\u2EF3|\u2F00-\u2FD5|\u3005|\u3007|\u3021-\u3029|\u3038-\u303A|\u303B|\u3400-\u4DB5|\u4E00-\u9FCC|\uF900-\uFA6D|\uFA70-\uFAD9";
    var YI_CHAR   = "\uA000-\uA014|\uA015|\uA016-\uA48C|\uA490-\uA4C6";
    var HANGUL_CHAR = "\u1100-\u11FF|\u302E-\u302F|\u3131-\u318E|\u3200-\u321E|\u3260-\u327E|\uA960-\uA97C|\uAC00-\uD7A3|\uD7B0-\uD7C6|\uD7CB-\uD7FB|\uFFA0-\uFFBE|\uFFC2-\uFFC7|\uFFCA-\uFFCF|\uFFD2-\uFFD7|\uFFDA-\uFFDC";
    var CJK_CHAR  = HAN_CHAR + "|" + YI_CHAR + "|" + HANGUL_CHAR;
    var CJK_RE    = new RegExp("(["+ CJK_CHAR +"])", "g");

    var rAry            = [];
    var rLength         = 0; // words
    var rSelectedSpeed  = DEFAULT_SPEED; // words per minute
    var rSelectedSpeedFraction
                        = (DEFAULT_SPEED - MIN_SPEED)/(MAX_SPEED - MIN_SPEED); // fraction: >=0, <=1
    var rPosition       = 0; // word
    var rMinDelay       = MIN_DELAY*speed2Base(rSelectedSpeed);
    var rLetterDelay    = LETTER_DELAY*speed2Base(rSelectedSpeed);
    var rRe2delay       = [];
    var rRe2delayLength = 0;

    function _init(pString, pPosition){
        rAry = pString
                    .replace(/[\-]{4,}/g, "---") //
                    .replace(/[_]{4,}/g, "___") //
                    .replace(/[=]{4,}/g, "===") //
                    .replace(/[+]{4,}/g, "+++") //
                    .replace(/[~]{4,}/g, "~~~") //
                    .replace(/\.\.\./g, "\u2026") //
                    .replace(/([a-zA-Z])([\(\)\[\]\{\}\.\?!:;\-,\u2026\/|\u2010-\u2015]{1,2})([a-zA-Z])/g, "$1$2 $3") //
                    .replace(/&nbsp;/g, " ") //
                    .replace(/\u00A0/g, " ") //
                    .replace(/\r\n/g, "\n") //
                    .replace(/[\n]{2,}/g, "\u00A0 ") // so we can distinguish "paragraph" ends
                    .replace(CJK_RE, " $1") //
                    .split(SPACES_RE);

        rLength = rAry.length;
        _setPosition(fmt.sanitizeNumber(pPosition, 0));
    }

    function _incPosition(pAmount) {
        _setPosition(rPosition + pAmount);
    }

    function _decPosition(pAmount) {
        _setPosition(rPosition - pAmount);
    }

    function _setPosition(pPosition){
        rPosition = Math.min(rLength, Math.max(0, pPosition));
    }

    function _getPosition(){
        return rPosition;
    }

    function _getPercentage(){
        return rLength > 0 ? 100*(rPosition/rLength) : 0;
    }

    function _setSpeed(pSpeed) {
        pSpeed         = fmt.sanitizeNumber(pSpeed, DEFAULT_SPEED);

        rSelectedSpeed = Math.min(MAX_SPEED, Math.max(MIN_SPEED, pSpeed));
        rSelectedSpeedFraction = (rSelectedSpeed - MIN_SPEED)/(MAX_SPEED - MIN_SPEED);

        var lBase      = speed2Base(pSpeed);
        rMinDelay      = MIN_DELAY*lBase;
        rLetterDelay   = LETTER_DELAY*lBase;

        rRe2delay = [
            {re: SENTENCE_END_RE,  delay: SENTENCE_END_DELAY*lBase},
            {re: /[;:\u2026\u2013\u00B7|\u2010-\u2015]/,
                                   delay: LONG_PUNCTUATION_DELAY*lBase},
            {re: /[-,\/\uFF0C]/,   delay: SHORT_PUNCTUATION_DELAY*lBase},
            {re: /[\(\)\[\]\{\}]/, delay: BRACKET_DELAY*lBase},
            {re: /["'\u2018\u2019\u201c\u201d]/,
                                   delay: QUOTE_DELAY*lBase},
            {re: /\u00A0/,         delay: PARAGRAPH_END_DELAY*lBase},
            {re: /[0-9=\+]/,       delay: NUMBER_DELAY*lBase},
            {re: /[A-Z]/,          delay: CAPITALS_DELAY*lBase},
            {re: CJK_RE,           delay: CJK_DELAY*lBase}
        ];
        rRe2delayLength = rRe2delay.length;
    }

    function _getSpeed(){
        return rSelectedSpeed;
    }

    function _setSpeedFraction(pFraction){
        rSelectedSpeedFraction = fmt.sanitizeNumber(pFraction, 0.5);
        _setSpeed(MIN_SPEED + rSelectedSpeedFraction*(MAX_SPEED - MIN_SPEED));
    }

    function _getSpeedFraction() {
        return rSelectedSpeedFraction;
    }

    function _incSpeed(pAmount){
        _setSpeed(rSelectedSpeed + pAmount);
    }

    function _decSpeed(pAmount){
        _setSpeed(rSelectedSpeed - pAmount);
    }

    function _gotoStartOfSentence() {
        var lFound = false;
        /*
         * when currently at the start of a sentence, hop to the
         * previous one
         */
        if (rAry[rPosition-1] && rAry[rPosition-1].match(SENTENCE_END_RE)){
            _decPosition(1);
        }
        /*
         * when currently at the end of a sentence, skip one word back
         * so the searching doesn't get stuck on the current word
         */
        if (rAry[rPosition] && rAry[rPosition].match(SENTENCE_END_RE)){
            _decPosition(1);
        }
        var lLimit = Math.max(rPosition - MAX_SKIP_AHEAD, 0);
        for (rPosition; (!lFound && (rPosition > lLimit)); rPosition--){
            if (rAry[rPosition] && rAry[rPosition].match(SENTENCE_END_RE)){
                lFound = true;
                rPosition += 2;
            }
        }
        /*
         * And if you're in a paragraph marker: bump one ahead
         */
        if (rAry[rPosition].match(PARAGRAPH_END_RE)){
            _incPosition(1);
        }
    }

    function gotoStartOfNextRE(pRE) {
        var lFound = false;

        var lLimit = Math.min(rPosition + MAX_SKIP_AHEAD, rLength);
        for (rPosition; (!lFound && (rPosition < lLimit)); rPosition++){
            if (rAry[rPosition] && rAry[rPosition].match(pRE)){
                lFound = true;
            }
        }
    }
    function _gotoStartOfNextSentence(){
        gotoStartOfNextRE(SENTENCE_END_RE);
    }

    function _gotoStartOfNextParagraph(){
        gotoStartOfNextRE(PARAGRAPH_END_RE);
    }

    function _gotoEndOfSentence() {
        var lFound = false;
        var lLimit = Math.min(rPosition + MAX_SKIP_AHEAD, rLength);
        for (rPosition; (!lFound && (rPosition < lLimit)); rPosition++){
            if (rAry[rPosition] && rAry[rPosition].match(SENTENCE_END_RE)){
                lFound = true;
                rPosition -= 1;
            }
        }
    }

    function _getLength(){
        return rLength;
    }

    function _getCurrentWord(){
        return rAry[rPosition];
    }

    function regexp2duration(pChar){
        for (var i = 0; i < rRe2delayLength; i++){
            if (rRe2delay[i].re.test(pChar)){
                return rRe2delay[i].delay;
            }
        }
        return rLetterDelay;
    }

    /*
     * return the average speed in wpm for the current string
     */
    function _getAverageSpeed(){
        var lTotalDisplayTime = 0;
        for (var i = 0; i < rLength; i++){
            lTotalDisplayTime += _determineDisplayTime(rAry[i]);
        }
        return rLength/(lTotalDisplayTime/MILLISECONDS_PER_MINUTE);
    }

    function speed2Base (pSpeed) {
        return (MILLISECONDS_PER_MINUTE/pSpeed)/300;// 300 = min delay + (6 2/3)xletter delay. Works ok for english.
    }

    function _getDisplayTime() {
        return _determineDisplayTime(rAry[rPosition]);
    }

    function _determineDisplayTime(pWord){
        var lRetval = 0;
        if (pWord){
            lRetval = rMinDelay;
            for (var i = 0, lLength = pWord.length; i < lLength; i++){
                lRetval += regexp2duration(pWord[i]);
            }
        }
        return lRetval;
    }

    function _getEstimatedTimeToGo(){
        return MILLISECONDS_PER_MINUTE*(rLength - rPosition)/rSelectedSpeed;
    }

    return {
        init: _init,
        getSpeed: _getSpeed,
        setSpeed: _setSpeed,
        setSpeedFraction: _setSpeedFraction,
        getSpeedFraction: _getSpeedFraction,
        incSpeed: _incSpeed,
        decSpeed: _decSpeed,
        getCurrentWord: _getCurrentWord,
        getDisplayTime: _getDisplayTime,
        getLength: _getLength,
        getPercentage: _getPercentage,
        getEstimatedTimeToGo: _getEstimatedTimeToGo,
        getAverageSpeed: _getAverageSpeed,
        getPosition: _getPosition,
        setPosition: _setPosition,
        incPosition: _incPosition,
        decPosition: _decPosition,
        gotoEndOfSentence: _gotoEndOfSentence,
        gotoStartOfSentence: _gotoStartOfSentence,
        gotoStartOfNextSentence: _gotoStartOfNextSentence,
        gotoStartOfNextParagraph: _gotoStartOfNextParagraph
    };
});

/*
 This file is part of WordyWordy.

 WordyWordy is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WordyWordy is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WordyWordy.  If not, see <http://www.gnu.org/licenses/>.
*/
