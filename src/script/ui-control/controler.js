/* jshint browser:true */
/* jshint nonstandard:true */
/* global define */
define(["../utl/formatting",
        "../utl/paramslikker",
        "../utl/browserutl",
        "./eventmap",
        "./actions"],
        function(
        fmt,
        paramslikker,
        butl,
        eve,
        actions
        ) {
    "use strict";
    
    var INITIAL_DISPLAY_DELAY   = 1000;  // milliseconds

    /* localStorage keys */
    var LS_KEY_BUFFER    = 'buffer';
    var LS_KEY_TITLE     = 'title';
    var LS_KEY_POSITION  = 'position';
    var LS_KEY_SPEED     = 'speed';
    var LS_KEY_THEME     = 'theme';

    var rParams    = paramslikker.getParams(window.location.search);

    function retrieveStateFromLocalStorage() {
        if (butl.localStorageOK()) {
            if (localStorage.getItem(LS_KEY_SPEED)){
                actions.setSpeed(localStorage.getItem(LS_KEY_SPEED));
            }
            if (localStorage.getItem(LS_KEY_BUFFER)){
                actions.initiateText(localStorage.getItem(LS_KEY_BUFFER), "");
            }
            if (localStorage.getItem(LS_KEY_TITLE)){
                actions.setDocumentTitle(localStorage.getItem(LS_KEY_TITLE));
            }
            if (localStorage.getItem(LS_KEY_POSITION)){
                actions.setPos(localStorage.getItem(LS_KEY_POSITION));
            }
            if (localStorage.getItem(LS_KEY_THEME)){
                actions.setTheme(localStorage.getItem(LS_KEY_THEME));
            }
        }
    }

    function processParameters() {
        if (rParams.speed) {
            actions.setSpeed(rParams.speed);
        }
        if (rParams.theme) {
            actions.setTheme(rParams.theme);
        }
        if (rParams.text) {
            actions.initiateText(decodeURIComponent(rParams.text), "url");
        }
        if (rParams.pos) {
            actions.setPos(rParams.pos);
        }
        if (rParams.loop && fmt.sanitizeBooleanesque(rParams.loop)) {
            actions.setLooping(true);
        } else {
            actions.setLooping(false);
        }
        if (rParams.play && fmt.sanitizeBooleanesque(rParams.play)) {
            window.setTimeout(actions.play, INITIAL_DISPLAY_DELAY);
        }
        var rCannedTexts = {
          "thoughts": "samples/thoughts.txt",
          "1984":"samples/1984.txt",
          "freedom": "samples/freedom.txt",
          "intro": "samples/intro.txt",
          "intro_nl": "samples/intro.nl.txt",
          "laozi": "samples/laozi.txt"
        };
        if (!(rParams.text) && rParams.canned ){
            butl.ajax (decodeURIComponent(rCannedTexts[rParams.canned]), function(pEvent){
                actions.initiateText(pEvent.target.response, rParams.canned);
            }, function (){
                // toast("Can't load that :-/");
            }
            );
        }
        if (!(rParams.text) && rParams.url ){
            butl.ajax (decodeURIComponent(rParams.url), function(pEvent){
                actions.initiateText(pEvent.target.response, rParams.url);
            }, function (){
                // toast("Can't load that :-/");
            }
            );
        }
    }
    eve.addEventListeners();
    retrieveStateFromLocalStorage();
    processParameters();
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
