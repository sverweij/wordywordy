/* jshint browser:true */
/* jshint nonstandard:true */
/* global define */
define(["../chopper/chopper",
        "../utl/formatting",
        "../utl/stopwatch",
        "../utl/browserutl",
        "../../lib/screenfull"
        ],
        function(
        words,
        fmt,
        stopwatch,
        butl,
        _screenfull
        ) {
    "use strict";
    var rPlaying     = false;
    var rWordsPlayed = 0;

    var rWordTimer;
    var rToastTimer;
    var rControlsTimer;
    var rHoveringOverControls = false;
    var rShowStatus    = false;
    var rLoop          = false;
    var rDocumentTitle = "";
    var rAppName       = "WordyWordy";

    var CH_PLAY           = '\u25B7'; // or \u23F5 which not available in std font
    var ICON_PLAY_CLASS   = "icon-play3";
    var ICON_PAUSE_CLASS  = "icon-pause2";

    var MILLISECONDS_PER_MINUTE = 60000; // milliseconds
    var TOAST_FADE_TIME         = 2200;  // milliseconds

    /* localStorage keys */
    var LS_KEY_BUFFER    = 'buffer';
    var LS_KEY_TITLE     = 'title';
    var LS_KEY_POSITION  = 'position';
    var LS_KEY_SPEED     = 'speed';
    var LS_KEY_THEME     = 'theme';

    var rStopwatch = new stopwatch.Stopwatch();

    var rCurrentTheme = 1;

    var rStyleSheets = [ 
     {title: "Zany", href: "style/themes/zany.css"},
     {title: "Sepia", href: "style/themes/sepia.css"},
     {title: "Day", href: "style/themes/day.css"},
     {title: "Night", href: "style/themes/night.css"},
     {title: "Low contrast", href: "style/themes/low-contrast.css"},
     {title: "High contrast", href: "style/themes/high-contrast.css"},
     {title: "Dyslexia - sepia", href: "style/themes/dyslexia-sepia.css"},
     {title: "Dyslexia - day", href: "style/themes/dyslexia-day.css"},
     {title: "Dyslexia - night", href: "style/themes/dyslexia-night.css"},
     {title: "Dyslexia - low contrast", href: "style/themes/dyslexia-low-contrast.css"},
     {title: "Dyslexia - high contrast", href: "style/themes/dyslexia-high-contrast.css"},
     {title: "Low contrast fat font", href: "style/themes/low-contrast-fat-font.css"},
     {title: "Sepia fat font", href: "style/themes/sepia-fat-font.css"},
     {title: "220", href: "style/themes/220.css"},
     {title: "057", href: "style/themes/057.css"},
     {title: "074", href: "style/themes/074.css"},
     {title: "HV", href: "style/themes/hv.css"},
     {title: "liberal", href: "style/themes/liberal.css"},
     {title: "progressive", href: "style/themes/progressive.css"}
    ];

    function outputNextWord(){
        if (rWordTimer){
            window.clearTimeout(rWordTimer);
        }
        if (rLoop === true) {
            window.__output.className = "playing";
        }

        if (rPlaying){
            if (words.getPosition() < words.getLength()){
                rWordTimer = window.setTimeout(outputNextWord, words.getDisplayTime());
                displayWord(words.getCurrentWord(), true);
                words.incPosition(1);
            } else if (rLoop === true) {
                words.setPosition(0);
                window.__output.className = "reload";
                rWordTimer = window.setTimeout(outputNextWord, 1000);
            } else {
                window.__output.textContent = "";
                window.__output.className   = "smile";
                pause();
            }
        }
    }

    function displayWord(pWord, pAddsToPlayedCount){
        if (undefined !== pWord) {
            window.__output.textContent = pWord;
            window.__percentage.setAttribute("style",
                            "width: " + words.getPercentage() + "%;");
            if (rShowStatus){
                updateStatus();
            }
            if (pAddsToPlayedCount) {
                rWordsPlayed++;
            }
        }
    }

    function updateStatus() {
        var lTimeElapsed = rStopwatch.getTimeElapsed();
        var lMinutesRead = lTimeElapsed/MILLISECONDS_PER_MINUTE;

        var lActualSpeed = lMinutesRead > 0 ? rWordsPlayed/ lMinutesRead : 0;
        var lTimeToGo    = words.getEstimatedTimeToGo();
        var lTimeTotal   = lTimeElapsed + lTimeToGo;

        window.__documentTitle.textContent = rDocumentTitle;
        window.__selectedSpeed.textContent = words.getSpeed().toFixed(0);
        window.__actualSpeed.textContent   = lActualSpeed.toFixed(0);
        window.__position.textContent      =  words.getPosition();
        window.__positionInPercent.textContent = words.getPercentage().toFixed(1);
        window.__wordsPlayed.textContent   =  rWordsPlayed;
        window.__wordsTotal.textContent    = words.getLength();

        window.__timeElapsed.textContent   = fmt.formatTime(lTimeElapsed);
        window.__timeToGo.textContent      = fmt.formatTime(lTimeToGo);
        window.__timeTotal.textContent     = fmt.formatTime(lTimeTotal);
    }

    function toggleStatus(){
        rShowStatus = !rShowStatus;
        if (rShowStatus){
            window.__status.style.display = "inline";
            updateStatus();
        } else {
            window.__status.style.display = "none";
        }
    }

    function play() {
        rStopwatch.resume();
        rPlaying = true;
        window.__output.className = "playing";
        window.__btn_playpause.className = ICON_PAUSE_CLASS;
        document.title = CH_PLAY + " " + rDocumentTitle + " - " + rAppName;
        outputNextWord();
    }

    function pause() {
        rStopwatch.pause();
        rPlaying = false;
        // __output.className = "breathing";
        document.title = rDocumentTitle + " - " + rAppName;
        window.__btn_playpause.className = ICON_PLAY_CLASS;
        if (butl.localStorageOK()) {
            localStorage.setItem("position", words.getPosition());
        }
    }

    function toastControls(){
        if (rControlsTimer){
            window.clearTimeout(rControlsTimer);
        }
        window.__controls.className = "";
        window.__actionbar.className = "";
        rControlsTimer = window.setTimeout(function(){
                    window.__controls.className = "fade-away";
                    window.__actionbar.className = "fade-away";
                }, TOAST_FADE_TIME);
    }

    function toast(pString){
        if (rToastTimer){
            window.clearTimeout(rToastTimer);
        }
        window.__toast.style.display = "block";
        window.__toast.className = "";
        window.__toast.innerHTML = pString;
        rToastTimer = window.setTimeout(function(){
                    window.__toast.className = "fade-away";
                },TOAST_FADE_TIME);
    }

    function setDocumentTitle(pString) {
        rDocumentTitle = pString;

        if (butl.localStorageOK()){
            localStorage.setItem(LS_KEY_TITLE, pString);
        }
    }

    function updateNavigation (pPause) {
        if (pPause) {
            pause();
        }
        displayWord(words.getCurrentWord(), false);
        toast(words.getPercentage().toFixed(1) + "%");
    }

    function updateSpeed (pSpeed) {
        updateStatus();
        toast(pSpeed.toFixed(0) + " wpm");
        if (butl.localStorageOK()) {
            localStorage.setItem(LS_KEY_SPEED, pSpeed);
        }
    }

    function updateTimeToGo() {
        toast("<span class='icon-stopwatch'></span>" + " -" + fmt.formatTime(words.getEstimatedTimeToGo()));
    }

    function cycleTheme(){
        rCurrentTheme++;
        if (rCurrentTheme >= rStyleSheets.length){
            rCurrentTheme = 0;
        }
        setTheme(rCurrentTheme);
    }

    function setTheme(pThemeNumber){
        var lThemeNumber =
            Math.max(
                Math.min(
                    fmt.sanitizeNumber(pThemeNumber,1),
                    rStyleSheets.length-1
                ),
                0
            );
        rCurrentTheme = lThemeNumber;
        window.customtheme.href=rStyleSheets[lThemeNumber].href;

        toast(rStyleSheets[lThemeNumber].title);
        if (butl.localStorageOK()){
            localStorage.setItem(LS_KEY_THEME, lThemeNumber);
        }
    }

    function openFile(){
        updateNavigation(true);
        window.__input_file.click();
    }
    function setPos(pPosition){
        words.setPosition(pPosition);
        updateNavigation(true);
    }
    function setPosFraction(pFraction){
        setPos(Math.floor(pFraction * words.getLength()));
    }
    function home(){
        setPos(0);
    }
    function dec(){
        words.decPosition(1);
        updateNavigation(true);
    }
    function playpause(){
        rPlaying = !rPlaying;
        if(rPlaying) {
            play();
        } else {
            pause();
        }
    }
    function inc(){
        words.incPosition(1);
        updateNavigation(true);
    }
    function end(){
        setPos(words.getLength());
    }

    function speedUp(){
        words.incSpeed(5);
        updateSpeed(words.getSpeed());
    }
    function slowDown(){
        words.decSpeed(5);
        updateSpeed(words.getSpeed());
    }
    function setSpeed(pSpeed){
        words.setSpeed(pSpeed);
        updateSpeed(words.getSpeed());
    }
    function setSpeedFraction(pFraction){
        words.setSpeedFraction(pFraction);
        updateSpeed(words.getSpeed());
    }
    function gotoStartOfNextSentence() {
        words.gotoStartOfNextSentence();
        updateNavigation(true);
    }
    function gotoStartOfSentence() {
        words.gotoStartOfSentence();
        updateNavigation(true);
    }
    function savePosition() {
        if (butl.localStorageOK()) {
            localStorage.setItem(LS_KEY_POSITION, words.getPosition());
        }
        toast("position saved");
    }
    function initiateText(pText, pTitle) {
        rWordsPlayed = 0;
        window.__output.className = "";
        if (butl.localStorageOK()) {
            localStorage.setItem(LS_KEY_BUFFER, pText);
        }
        words.init(pText);
        window.__avgSpeed.textContent = words.getAverageSpeed().toFixed(1);
        displayWord(words.getCurrentWord());
        updateTimeToGo();
        setDocumentTitle(pTitle);
    }
    function setLooping(pBoolean){
        rLoop = pBoolean;
    }
    function forgetEverything(){
        initiateText("", "");
        if (butl.localStorageOK()) {
            localStorage.removeItem(LS_KEY_BUFFER);
            localStorage.removeItem(LS_KEY_TITLE);
            localStorage.removeItem(LS_KEY_POSITION);
            localStorage.removeItem(LS_KEY_SPEED);
            localStorage.removeItem(LS_KEY_THEME);
        }
        home();
        toast("Forgot everything");
    }
    function toggleFullscreen(){
        if (window.screenfull.enabled) {
            window.screenfull.toggle();
        }
    }

    function mousemove(){
        if (!rHoveringOverControls) {
            toastControls();
        }
    }
    function controlsMouseover(){
        if (rControlsTimer) {
            window.clearTimeout(rControlsTimer);
        }
        rHoveringOverControls = true;
        window.__controls.className = "";
        window.__actionbar.className = "";
    }
    function controlsMouseout(){
        rHoveringOverControls = false;
    }
    return {
        toggleStatus: toggleStatus,
        play: play,
        pause: pause,
        toast: toast,
        setDocumentTitle: setDocumentTitle,
        updateTimeToGo: updateTimeToGo,
        setTheme: setTheme,
        cycleTheme: cycleTheme,
        openFile: openFile,
        setPos: setPos,
        setPosFraction: setPosFraction,
        home: home,
        end: end,
        dec: dec,
        playpause: playpause,
        inc: inc,
        speedUp: speedUp,
        slowDown: slowDown,
        setSpeed: setSpeed,
        setSpeedFraction: setSpeedFraction,
        gotoStartOfNextSentence: gotoStartOfNextSentence,
        gotoStartOfSentence: gotoStartOfSentence,
        savePosition: savePosition,
        initiateText: initiateText,
        setLooping: setLooping,
        forgetEverything: forgetEverything,
        toggleFullscreen: toggleFullscreen,
        mousemove: mousemove,
        controlsMouseover: controlsMouseover,
        controlsMouseout: controlsMouseout
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
