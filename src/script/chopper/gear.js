/* istanbul ignore else */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {

    var formatting = require("../utl/formatting");
    var constants  = require("./constants");

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

    var rSelectedSpeed  = DEFAULT_SPEED; // words per minute
    var rMinDelay       = MIN_DELAY * speed2Base(rSelectedSpeed);
    var rLetterDelay    = LETTER_DELAY * speed2Base(rSelectedSpeed);
    var rRe2delay       = [];

    function _setSpeed(pSpeed) {
        pSpeed         = formatting.sanitizeNumber(pSpeed, DEFAULT_SPEED);
        rSelectedSpeed = Math.min(MAX_SPEED, Math.max(MIN_SPEED, pSpeed));
        updateDelays(speed2Base(pSpeed));
    }

    function updateDelays(pBase) {
        rMinDelay      = MIN_DELAY * pBase;
        rLetterDelay   = LETTER_DELAY * pBase;

        rRe2delay = [
            {re: constants.SENTENCE_END_RE, delay: SENTENCE_END_DELAY * pBase},
            {re: /[;:\u2026\u2013\u00B7|\u2010-\u2015]/,
                delay: LONG_PUNCTUATION_DELAY * pBase},
            {re: /[-,/\uFF0C]/,     delay: SHORT_PUNCTUATION_DELAY * pBase},
            {re: /[()[]{}]/,        delay: BRACKET_DELAY * pBase},
            {re: /["'\u2018\u2019\u201c\u201d]/,
                delay: QUOTE_DELAY * pBase},
            {re: /\u00A0/,          delay: PARAGRAPH_END_DELAY * pBase},
            {re: /[0-9=+]/,         delay: NUMBER_DELAY * pBase},
            {re: /[A-Z]/,           delay: CAPITALS_DELAY * pBase},
            {re: constants.CJK_RE,          delay: CJK_DELAY * pBase}
        ];
    }
    function regexp2duration(pChar){
        var lDefinedDelays = rRe2delay.filter(function(pElement){
            return pElement.re.test(pChar);
        });
        return lDefinedDelays.length > 0 ? lDefinedDelays[0].delay : rLetterDelay;
    }

    function speed2Base (pSpeed) {
        // 300 = min delay + (6 2/3)xletter delay. Works ok for english.
        return (constants.MILLISECONDS_PER_MINUTE / pSpeed) / 300;
    }

    function _determineDisplayTime(pWord){
        return pWord
            ? pWord.split('')
                .reduce(function(pPrev, pChar){
                    return pPrev + regexp2duration(pChar);
                }, rMinDelay)
            : 0;
    }

    return {
        setSpeed: _setSpeed,
        getSpeed: function (){
            return rSelectedSpeed;
        },
        incSpeed: function (pAmount){
            _setSpeed(rSelectedSpeed + pAmount);
        },
        decSpeed: function (pAmount){
            _setSpeed(rSelectedSpeed - pAmount);
        },
        determineDisplayTime: _determineDisplayTime
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
