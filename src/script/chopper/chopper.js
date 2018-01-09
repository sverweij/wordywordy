/* istanbul ignore else */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    "use strict";

    var tokenizer = require("./tokenizer");
    var gear      = require("./gear");
    var navigator = require("./navigator");
    var constants = require("./constants");

    var rWordArray = [];

    return {
        init: function (pString, pPosition){
            rWordArray = tokenizer.tokenize(pString);
            navigator.init(rWordArray, pPosition);
        },
        getSpeed: gear.getSpeed,
        setSpeed: gear.setSpeed,
        incSpeed: gear.incSpeed,
        decSpeed: gear.decSpeed,
        getCurrentWord: navigator.getCurrentWord,
        getLength: navigator.getLength,
        getPercentage: navigator.getPercentage,
        getPosition: navigator.getPosition,
        setPosition: navigator.setPosition,
        incPosition: navigator.incPosition,
        decPosition: navigator.decPosition,
        gotoEndOfSentence: navigator.gotoEndOfSentence,
        gotoStartOfSentence: navigator.gotoStartOfSentence,
        gotoStartOfNextSentence: navigator.gotoStartOfNextSentence,
        gotoStartOfNextParagraph: navigator.gotoStartOfNextParagraph,

        getDisplayTime: function (){
            return gear.determineDisplayTime(navigator.getCurrentWord());
        },
        getEstimatedTimeToGo: function (){
            return constants.MILLISECONDS_PER_MINUTE * (navigator.getLength() - navigator.getPosition()) / gear.getSpeed();
        },
        /* average speed in wpm */
        getAverageSpeed: function (){
            var lTotalDisplayTime = rWordArray.reduce(function(pPreviousValue, pItem){
                return pPreviousValue + gear.determineDisplayTime(pItem);
            }, 0);
            return rWordArray.length / (lTotalDisplayTime / constants.MILLISECONDS_PER_MINUTE);
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
