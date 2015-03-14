/* jshint nonstandard:true */
/* jshint node:true */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    "use strict";
    return {
        getParams: function (pSearchString) {
            var lRetval = {};
            if (pSearchString) {
                var lKeyValAry;
                //  search string always starts with a "?" - skip this
                pSearchString.slice(1).split("&").forEach(function(pKeyVal){
                    lKeyValAry = pKeyVal.split("=");
                    if (2 === lKeyValAry.length) {
                        lRetval[lKeyValAry[0]] = unescape(lKeyValAry[1]);
                    }
                });
            }
            return lRetval;
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
