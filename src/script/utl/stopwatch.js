if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    "use strict";

    function Stopwatch () {
        this.reset = function () {
            this.state = "paused"; // running, paused
            this.startTime = Date.now();
            this.pauseStartTime = this.startTime;
            this.cumulativePauses = 0;
        };

        // constructor hack
        this.reset();
    }

    Stopwatch.prototype.start = function () {
        this.state             = "running";
        this.startTime         = Date.now();
        this.pauseStartTime    = this.startTime;
        this.cumulativePauses  = 0;
    };

    Stopwatch.prototype.resume = function () {
        this.state             = "running";
        var lPause             = (Date.now() - this.pauseStartTime);
        this.cumulativePauses += lPause;
    };

    Stopwatch.prototype.pause = function () {
        if (this.state !== "paused"){
            this.state             = "paused";
            this.pauseStartTime    = Date.now();
        }
    };

    Stopwatch.prototype.getTimeElapsed = function () {
        if (this.state === "running"){
            return Date.now() - this.startTime - this.cumulativePauses;
        } else {
            return this.pauseStartTime - this.startTime - this.cumulativePauses;
        }
    };

    return {Stopwatch: Stopwatch};
});

/*
 This file is part of WordyWordy.

 mscgen_js is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 mscgen_js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with mscgen_js.  If not, see <http://www.gnu.org/licenses/>.
*/ 
