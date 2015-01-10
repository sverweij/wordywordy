/* jshint browser:true */
/* global define */
define(["./formatting"], function(fmt){
    "use strict";

    return {
        ajax : function (pURL, pSuccessFunction, pErrorFunction) {
            var lHttpRequest = new XMLHttpRequest();
            lHttpRequest.onreadystatechange = function (pEvent) {
                if((pEvent.target.readyState === 4) &&
                    (!pEvent.target.status || (pEvent.target.status === 200))
                ) {
                    pSuccessFunction(pEvent);
                } else {
                    pErrorFunction(pEvent);
                }
            };
            lHttpRequest.open('GET', pURL);
            lHttpRequest.responseType = "text";
            lHttpRequest.send();
        },
        selectStyleSheet : function (pIndex) {
            /*
             * The perfectly sensible way to do this is to
             * use the document.styleSheets collection and switch
             * the disabled property to false for the selected
             * theme, and switch it off for the others.
             *
             * WebKut, however, only sees the first stylesheet
             * with a title. Hence this even-more-ugly-than-usual
             * piece of code...
             */

            var lStyleSheetTitle = "";
            var lStyleSheets = document.querySelectorAll("link[type='text/css']");
            var lStyleMetaTag = document.querySelectorAll("meta[http-equiv=Default-Style]")[0];
            var lStyleSheetsLength = lStyleSheets.length;

            if ((lStyleSheetsLength > 1) && lStyleMetaTag) {
                pIndex = Math.min( lStyleSheetsLength - 1,
                                         Math.max(1, fmt.sanitizeNumber(pIndex, 1))
                                       );

                lStyleSheetTitle = lStyleSheets[pIndex].title;
                /*
                 * Dynamically setting the meta tag then doesn't work in
                 * Gecko, hence some funky feature detection
                 * (which only works when there are no external stylesheets
                 * - which is good enough (tm) for now) and the straighforward
                 * for loop
                 */
                if (document.styleSheets.length === lStyleSheetsLength) {
                    for (var i = 1; i < lStyleSheetsLength; i++){
                        if (i === pIndex) {
                            document.styleSheets[i].disabled = false;
                        } else {
                            document.styleSheets[i].disabled = true;
                        }
                    }
                } else {
                    lStyleMetaTag.content = lStyleSheetTitle;
                }
            }
            return lStyleSheetTitle;
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
 MERCHANTABILITY or FITNEdq.SS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WordyWordy.  If not, see <http://www.gnu.org/licenses/>.
 */
