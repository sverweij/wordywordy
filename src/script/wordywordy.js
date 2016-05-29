/* global require */
require(["utl/formatting",
        "utl/paramslikker",
        "utl/browserutl",
        "utl/gaga",
        "ui-control/eventmap",
        "ui-control/actions",
        "ui-control/constants"],
function(
        fmt,
        paramslikker,
        butl,
        gaga,
        eve,
        actions,
        C
        ) {
    "use strict";

    var INITIAL_DISPLAY_DELAY   = 1000;  // milliseconds
    var rCannedTexts = {
        "thoughts": "samples/thoughts.txt",
        "1984":"samples/1984.txt",
        "freedom": "samples/freedom.txt",
        "intro": "samples/intro.txt",
        "intro_nl": "samples/intro.nl.txt",
        "laozi": "samples/laozi.txt"
    };

    function setupGA (pDoNotTrack){
        gaga.gaSetup(!pDoNotTrack);
        gaga.g('create', '{{trackingid}}', '{{host}}');
        gaga.g('send', 'pageview');
    }

    function processParameters(pParams) {
        setupGA(fmt.sanitizeBooleanesque(pParams.donottrack));

        if (pParams.speed) {
            actions.setSpeed(pParams.speed);
        }
        if (pParams.theme) {
            actions.setTheme(pParams.theme);
        }
        if (pParams.text) {
            actions.initiateText(decodeURIComponent(pParams.text), "url");
        }
        if (pParams.pos) {
            actions.setPos(pParams.pos);
        }
        if (pParams.loop && fmt.sanitizeBooleanesque(pParams.loop)) {
            actions.setLooping(true);
        } else {
            actions.setLooping(false);
        }
        if (pParams.play && fmt.sanitizeBooleanesque(pParams.play)) {
            window.setTimeout(actions.play, INITIAL_DISPLAY_DELAY);
        }
        if (!(pParams.text) && pParams.canned){
            butl.ajax(decodeURIComponent(rCannedTexts[pParams.canned]), function(pEvent){
                actions.initiateText(pEvent.target.response, pParams.canned);
            }, function (){
                // toast("Can't load that :-/");
                gaga.g('send', 'exception', {
                    'exDescription' : 'could-not-load-canned-text ' + pParams.canned,
                    'exFatal' : false
                });

            }
            );
        }
        if (!(pParams.text) && pParams.url){
            butl.ajax(decodeURIComponent(pParams.url), function(pEvent){
                actions.initiateText(pEvent.target.response, pParams.url);
            }, function (){
                // toast("Can't load that :-/");
                gaga.g('send', 'exception', {
                    'exDescription' : 'could-not-load-text-from-url ' + pParams.url,
                    'exFatal' : false
                });
            }
            );
        }
    }

    function processLocalStorageKey (pKey, pFunction, pParam){
        if (localStorage.getItem(pKey)){
            pFunction(localStorage.getItem(pKey), pParam);
        }
    }

    function retrieveStateFromLocalStorage() {
        if (butl.localStorageOK()) {
            processLocalStorageKey(C.LS_KEY_SPEED, actions.setSpeed);
            processLocalStorageKey(C.LS_KEY_TITLE, actions.setDocumentTitle);
            processLocalStorageKey(C.LS_KEY_BUFFER, actions.initiateText, actions.getDocumentTitle());
            processLocalStorageKey(C.LS_KEY_POSITION, actions.setPos);
            processLocalStorageKey(C.LS_KEY_THEME, actions.setTheme);
        }
    }

    eve.addEventListeners();
    retrieveStateFromLocalStorage();
    processParameters(paramslikker.getParams(window.location.search));
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
