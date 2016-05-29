/* global ga */
/* eslint max-params:0, dot-notation:0, no-unused-expressions:0, no-sequences:0 */
define([],
/**
 * Wrapper for google analytics. Makes it more easy to implement "donottrack"
 *
 * @exports gaga
 * @author {@link https://github.com/sverweij | Sander Verweij}
 */
function() {
    "use strict";

    var gTrack = true;

    return {
        /**
         * if pTrack === true, calls the google analytics setup code.
         * Does nothing otherwise
         *
         * @param {boolean} pTrack
         */
        gaSetup : function (pTrack) {
            gTrack = pTrack;
            window['ga-disable-{{trackingid}}'] = !gTrack;
        },
        /**
         * If analytics was setup using gaSetup, and tracking is on, sends
         * a ga event. Parameters same as the analytics ga function
         */
        g : function (pCommand, pEvent, pCategory, pAction, pLabel, pValue) {
            if (true === gTrack) {
                if (Boolean(window.ga)) {
                    if (ga.loaded) {
                        console.log(pCommand, pEvent, pCategory, pAction, pLabel, pValue);
                        ga(pCommand, pEvent, pCategory, pAction, pLabel, pValue);
                    } else {
                        console.error('ga exists, not loaded', pCommand, pEvent, pCategory, pAction, pLabel, pValue);
                    }
                } else {
                    console.error('ga doesn\'t exist yet', pCommand, pEvent, pCategory, pAction, pLabel, pValue);
                }
            }
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
