/* jshint browser:true */
/* global define */
define([], function(){
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
