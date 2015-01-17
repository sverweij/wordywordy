/* jshint node:true */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    "use strict";

    var MILLISECONDS_PER_SECOND = 1000; // milliseconds
    var SECONDS_PER_MINUTE      = 60; // seconds
    var MINUTES_PER_HOUR        = 60; // minutes
    var HOURS_PER_DAY           = 24; // hours

    function millisToTimeStruct (pMilliSeconds) {
        var lSeconds = pMilliSeconds/ MILLISECONDS_PER_SECOND;
        var lMinutes = Math.max(0, lSeconds/ SECONDS_PER_MINUTE);
        var lHours   = Math.max(0, lMinutes/ MINUTES_PER_HOUR);
        var lDays    = Math.max(0, lHours/ HOURS_PER_DAY);

        var lMilliSeconds = Math.max(0, pMilliSeconds - (Math.floor(lSeconds)*MILLISECONDS_PER_SECOND));
        lSeconds     = Math.max(0, lSeconds - (Math.floor(lMinutes) * SECONDS_PER_MINUTE));
        lMinutes     = Math.max(0, lMinutes - (Math.floor(lHours) * MINUTES_PER_HOUR));
        lHours       = Math.max(0, lHours - (Math.floor(lDays) * HOURS_PER_DAY));

        return {
            "days"         : Math.floor(lDays),
            "hours"        : Math.floor(lHours),
            "minutes"      : Math.floor(lMinutes),
            "seconds"      : Math.floor(lSeconds),
            "milliseconds" : lMilliSeconds
        };
    }

    function formatTimeBlob (pInt) {
        if (pInt < 10) {
            return "0" + pInt;
        }
        return pInt.toString();
    }

    return {
        formatTime : function (pMilliSeconds, pShowMillis) {
            var lTimeStruct = millisToTimeStruct(pMilliSeconds);
            if (!pShowMillis) { pShowMillis = false; }
            var lRetval =
                   (lTimeStruct.hours > 0 ? lTimeStruct.hours + ":" : "") +
                   formatTimeBlob (lTimeStruct.minutes) + ":" +
                   formatTimeBlob (lTimeStruct.seconds) +
                   (pShowMillis ? "." + lTimeStruct.milliseconds: "");
            return lRetval;
        },
        sanitizeNumber : function (pThing, pDefault){
            if (typeof pThing  === 'string') {
                pThing = parseInt(pThing);
            }
            if (typeof pThing !== 'number' || isNaN(pThing) ){
                pThing = pDefault;
            }
            return pThing;
        },
        /**
         * returns true if pString equals "1", "true", "y" or "yes
         */
        sanitizeBooleanesque : function (pString){
            return (["1", "true", "y", "yes"].indexOf(pString)> -1);
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
