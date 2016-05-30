/* istanbul ignore else */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["./tokenizer", "./gear", "./navigator", "./constants"],
function(tokenizer, gear, navi, C) {
    "use strict";

    var rWordArray = [];

    return {
        init: function (pString, pPosition){
            rWordArray = tokenizer.tokenize(pString || "");
            navi.init(rWordArray, pPosition);
        },
        getSpeed: gear.getSpeed,
        setSpeed: gear.setSpeed,
        incSpeed: gear.incSpeed,
        decSpeed: gear.decSpeed,
        getCurrentWord: navi.getCurrentWord,
        getLength: navi.getLength,
        getPercentage: navi.getPercentage,
        getPosition: navi.getPosition,
        setPosition: navi.setPosition,
        incPosition: navi.incPosition,
        decPosition: navi.decPosition,
        gotoEndOfSentence: navi.gotoEndOfSentence,
        gotoStartOfSentence: navi.gotoStartOfSentence,
        gotoStartOfNextSentence: navi.gotoStartOfNextSentence,
        gotoStartOfNextParagraph: navi.gotoStartOfNextParagraph,

        getDisplayTime: function (){
            return gear.determineDisplayTime(navi.getCurrentWord());
        },
        getEstimatedTimeToGo: function (){
            return C.MILLISECONDS_PER_MINUTE * (navi.getLength() - navi.getPosition()) / gear.getSpeed();
        },
        /* average speed in wpm */
        getAverageSpeed: function (){
            var lTotalDisplayTime = rWordArray.reduce(function(pPreviousValue, pItem){
                return pPreviousValue + gear.determineDisplayTime(pItem);
            }, 0);
            return rWordArray.length / (lTotalDisplayTime / C.MILLISECONDS_PER_MINUTE);
        }
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
