/* jshint browser:true */
/* jshint nonstandard:true */
/* global define */
define(["../chopper/chopper",
        "../utl/formatting",
        "../utl/stopwatch",
        "../utl/paramslikker",
        "../utl/browserutl"],
        function(
        words,
        fmt,
        stopwatch,
        paramslikker,
        butl
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

    var SPACE_KEY    = 32;
    var ENTER_KEY    = 13;
    var LEFT_KEY     = 37;
    var UP_KEY       = 38;
    var RIGHT_KEY    = 39;
    var DOWN_KEY     = 40;
    var SECTION_KEY_FF = 0;
    var SECTION_KEY  = 192; // on FF this is the ` (backquote)
                           // in safari both the § and ` key listen to 192
    var A_KEY        = 65;
    var B_KEY        = 66;
    var C_KEY        = 67;
    var D_KEY        = 68;
    var E_KEY        = 69;
    var O_KEY        = 79;
    var Q_KEY        = 81;
    var S_KEY        = 83;
    var T_KEY        = 84;
    var V_KEY        = 86;
    var W_KEY        = 87;
    var PAGEUP_KEY   = 33;
    var PAGEDOWN_KEY = 34;
    var HOME_KEY     = 36;
    var END_KEY      = 35;
    // var ESC_KEY = 27;
    var COMMA_KEY    = 188;
    var DOT_KEY      = 190;
    var SLASH_KEY    = 191;
    var ZERO_KEY     = 48;
    var ONE_KEY      = 49;
    var TWO_KEY      = 50;
    var THREE_KEY    = 51;
    var FOUR_KEY     = 52;
    var FIVE_KEY     = 53;
    var SIX_KEY      = 54;
    var SEVEN_KEY    = 55;
    var EIGHT_KEY    = 56;
    var NINE_KEY     = 57;

    var CH_PLAY           = '\u25B7'; // or \u23F5 which not available in std font
    var ICON_PLAY_CLASS   = "icon-play3";
    var ICON_PAUSE_CLASS  = "icon-pause2";

    var MILLISECONDS_PER_MINUTE = 60000; // milliseconds
    var INITIAL_DISPLAY_DELAY   = 1000;  // milliseconds
    var TOAST_FADE_TIME         = 2200;  // milliseconds

    /* localStorage keys */
    var LS_KEY_BUFFER    = 'buffer';
    var LS_KEY_TITLE     = 'title';
    var LS_KEY_POSITION  = 'position';
    var LS_KEY_SPEED     = 'speed';
    var LS_KEY_THEME     = 'theme';

    var rStopwatch = new stopwatch.Stopwatch();
    var rReader    = new FileReader();
    var rParams    = paramslikker.getParams(window.location.search);


    function playString(pString) {
        rWordsPlayed = 0;
        words.init(pString, 0);
        window.__avgSpeed.textContent = words.getAverageSpeed().toFixed(1);
        updateTimeToGo();
        rStopwatch.start();
        play();
    }

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
        var lMinutesRead = (lTimeElapsed)/MILLISECONDS_PER_MINUTE;

        var lActualSpeed = lMinutesRead > 0 ? rWordsPlayed/ lMinutesRead : 0;
        var lTimeToGo    = words.getEstimatedTimeToGo();
        var lTimeTotal   = lTimeElapsed + lTimeToGo;

        window.__documentTitle.textContent = rDocumentTitle;
        window.__selectedSpeed.textContent = words.getSpeed();
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
        if (localStorageOK()) {
            localStorage.setItem("position", words.getPosition());
        }
    }

    function toastControls(){
        if (rControlsTimer){
            window.clearTimeout(rControlsTimer);
        }
        window.__controls.className = "";
        rControlsTimer = window.setTimeout(function(){
                    window.__controls.className = "fade-away";
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

        if (localStorageOK()){
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
        toast(pSpeed + " wpm");
        if (localStorageOK()) {
            localStorage.setItem(LS_KEY_SPEED, pSpeed);
        }
    }

    function updateTimeToGo() {
        toast("<span class='icon-stopwatch'></span>" + " -" + fmt.formatTime(words.getEstimatedTimeToGo()));
    }

    function setTheme(pThemeNumber){

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

        // var lStyleSheets = document.querySelectorAll("style");
        var lStyleSheets = document.querySelectorAll("link[type='text/css']");
        var lStyleMetaTag = document.querySelectorAll("meta[http-equiv=Default-Style]")[0];
        var lStyleSheetsLength = lStyleSheets.length;

        if ((lStyleSheetsLength > 1) && lStyleMetaTag) {
            pThemeNumber = Math.min( lStyleSheetsLength - 1,
                                     Math.max(1, fmt.sanitizeNumber(pThemeNumber, 1))
                                   );

            /*
             * Dynamically setting the meta tag then doesn't work in
             * Gecko, hence some funky feature detection
             * (which only works when there are no external stylesheets
             * - which is good enough (tm) for now) and the straighforward
             * for loop
             */
            if (document.styleSheets.length === lStyleSheetsLength) {
                for (var i = 1; i < lStyleSheetsLength; i++){
                    if (i === pThemeNumber) {
                        document.styleSheets[i].disabled = false;
                    } else {
                        document.styleSheets[i].disabled = true;
                    }
                }
            } else {
                lStyleMetaTag.content = lStyleSheets[pThemeNumber].title;
            }

            toast(lStyleSheets[pThemeNumber].title);
            if (localStorageOK()){
                localStorage.setItem(LS_KEY_THEME, pThemeNumber);
            }
        }
    }

    function localStorageOK(){
        return (typeof localStorage !== 'undefined');
    }

    function openFile(){
        updateNavigation(true);
        window.__input_file.click();
    }
    function setPos(pPosition){
        words.setPosition(pPosition);
        updateNavigation(true);
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

    /* event handling */
    function paste(pEvent){
        if (pEvent && pEvent.clipboardData) {
            window.__output.className = "";
            if (localStorageOK()) {
                localStorage.setItem(LS_KEY_BUFFER, pEvent.clipboardData.getData("text/plain"));
            }
            setDocumentTitle("clipboard");
            playString(pEvent.clipboardData.getData("text/plain"));
        }
        pEvent.preventDefault();
    }

    function drag(pEvent){
        pEvent.preventDefault();
    }
    function dragEnter(pEvent){
        pEvent.preventDefault();
    }
    function dragLeave(pEvent){
        pEvent.preventDefault();
         window.__output.className="breathing";
    }
    function dragStart(pEvent){
        pEvent.preventDefault();
    }
    function dragOver(pEvent){
        pEvent.preventDefault();
        window.__output.className = "openmouth";
    }
    function dragEnd(pEvent){
        pEvent.preventDefault();
        window.__output.className = "breathing";
    }
    function hasTextMime(pKindOfIterableObject){
        for (var i=0;i<pKindOfIterableObject.length;i++){
            if ("text/plain" === pKindOfIterableObject[i]) {
                return true;
            }
        }
        return false;
    }
    function drop(pEvent){
        window.__output.className = "playing";
        if (pEvent.dataTransfer.files.length > 0){
            var lFile = pEvent.dataTransfer.files[0];
            if (lFile.type === "text/plain"){
                rReader.readAsText(lFile);
                setDocumentTitle(lFile.name);
            }
        } else {
            if (hasTextMime(pEvent.dataTransfer.types)) {
                if (localStorageOK()) {
                    localStorage.setItem(LS_KEY_BUFFER, pEvent.dataTransfer.getData("text/plain"));
                }
                setDocumentTitle("drag/ drop");
                playString(pEvent.dataTransfer.getData("text/plain"));
            }
        }
        pEvent.preventDefault();
    }

    function percentageClick(pEvent) {
        var lSelectedPosition = pEvent.clientX/window.__percentagewrap.scrollWidth;
        setPos(Math.floor(lSelectedPosition * words.getLength()));
    }

    function keydown (pEvent) {
        // console.log(pEvent.keyCode);
        if (   HOME_KEY === pEvent.keyCode ) {
            home();
        }
        if (   C_KEY === pEvent.keyCode ) {
            playString("");
            if (localStorageOK()) {
                localStorage.removeItem(LS_KEY_BUFFER);
                localStorage.removeItem(LS_KEY_TITLE);
                localStorage.removeItem(LS_KEY_POSITION);
                localStorage.removeItem(LS_KEY_SPEED);
                localStorage.removeItem(LS_KEY_THEME);
            }
            home();
            toast("Forgot everything");
        }
        if (   END_KEY === pEvent.keyCode ) {
            end();
        }
        if ( DOT_KEY === pEvent.keyCode ||
             COMMA_KEY === pEvent.keyCode ||
             SLASH_KEY === pEvent.keyCode ) {
            toggleStatus();
        }
        if ( T_KEY === pEvent.keyCode ) {
            updateTimeToGo();
        }
        if( SPACE_KEY === pEvent.keyCode ||
            ENTER_KEY === pEvent.keyCode ) {
            playpause();
        }
        if ( LEFT_KEY === pEvent.keyCode ||
             A_KEY === pEvent.keyCode ){
            dec();
        }
        if (  PAGEDOWN_KEY === pEvent.keyCode ||
              E_KEY === pEvent.keyCode) {
            words.gotoEndOfSentence();
            updateNavigation(true);
        }
        if ( RIGHT_KEY === pEvent.keyCode ||
             D_KEY === pEvent.keyCode ) {
            inc();
        }
        if ( PAGEUP_KEY === pEvent.keyCode ||
             Q_KEY === pEvent.keyCode) {
            words.gotoStartOfSentence();
            updateNavigation(true);
        }
        if ( DOWN_KEY === pEvent.keyCode ||
             S_KEY === pEvent.keyCode) {
            slowDown();
        }
        if ( UP_KEY === pEvent.keyCode ||
             W_KEY == pEvent.keyCode ) {
            speedUp();
        }
        if ( O_KEY === pEvent.keyCode ) {
            openFile();
        }
        if ( B_KEY === pEvent.keyCode ) {
            if (localStorageOK()) {
                localStorage.setItem(LS_KEY_POSITION, words.getPosition());
            }
            toast("position saved");
        }
        if ( V_KEY === pEvent.keyCode ) {
            toast(rAppName + " ${version}");
        }
        if (ONE_KEY   === pEvent.keyCode) { setTheme(1); }
        if (TWO_KEY   === pEvent.keyCode) { setTheme(2); }
        if (THREE_KEY === pEvent.keyCode) { setTheme(3); }
        if (FOUR_KEY  === pEvent.keyCode) { setTheme(4); }
        if (FIVE_KEY  === pEvent.keyCode) { setTheme(5); }
        if (SIX_KEY   === pEvent.keyCode) { setTheme(6); }
        if (SEVEN_KEY === pEvent.keyCode) { setTheme(7); }
        if (EIGHT_KEY === pEvent.keyCode) { setTheme(8); }
        if (NINE_KEY  === pEvent.keyCode) { setTheme(9); }
        if (ZERO_KEY  === pEvent.keyCode) { setTheme(10); }
        if ( SECTION_KEY_FF === pEvent.keyCode ||
             SECTION_KEY    === pEvent.keyCode) {
            setTheme(11);
        }
        window.__droparea.value = "";
    }

    function wheel (pEvent){
        pEvent.preventDefault();
        if (pEvent.deltaY) {
            if (pEvent.deltaY > 0){
                inc();
            } else if(pEvent.deltaY < 0)  {
                dec();
            }
        } else if ( pEvent.deltaX && pEvent.deltaX !== 0 &&
                    pEvent.deltaY === 0){
            if (pEvent.deltaX > 0){
                dec(); // not a typo
            } else if(pEvent.deltaX < 0)  {
                inc(); // not a typo
            }
        }
        updateNavigation(true);
    }

    function loadend (pEvent){
        if (pEvent && pEvent.target && pEvent.target.result) {
            if (localStorageOK()) {
                localStorage.setItem(LS_KEY_BUFFER, pEvent.target.result);
            }
            playString(pEvent.target.result);
        }
    }

    rReader.addEventListener("loadend", loadend);

    function oink (pEvent){
        if (pEvent.target.files.length > 0){
            var lFile = pEvent.target.files[0];
            if (lFile.type === "text/plain"){
                rReader.readAsText(lFile);
                setDocumentTitle(lFile.name);
            }
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
    }

    function controlsMouseout(){
        rHoveringOverControls = false;
    }

    window.__droparea.addEventListener("drag", drag, true);
    window.__droparea.addEventListener("dragenter", dragEnter, true);
    window.__droparea.addEventListener("dragleave", dragLeave, true);
    window.__droparea.addEventListener("dragstart", dragStart, true);
    window.__droparea.addEventListener("dragover", dragOver, true);
    window.__droparea.addEventListener("dragend", dragEnd, true);
    window.__droparea.addEventListener("paste", paste, true);
    window.__droparea.addEventListener("drop", drop, true);
    window.__percentagewrap.addEventListener("click", percentageClick, true);
    window.__uparea.addEventListener("click", speedUp, true);
    window.__downarea.addEventListener("click", slowDown, true);
    window.__leftarea.addEventListener("click", dec, true);
    window.__rightarea.addEventListener("click", playpause, true);
    window.__input_file.addEventListener("change", oink, true);
    window.__btn_open.addEventListener("click", openFile, true);
    window.__btn_home.addEventListener("click", home, true);
    window.__btn_dec.addEventListener("click", dec, true);
    window.__btn_playpause.addEventListener("click", playpause, false);
    window.__btn_inc.addEventListener("click", inc, true);
    window.__btn_end.addEventListener("click", end, true);
    window.__btn_slowdown.addEventListener("click", slowDown, true);
    window.__btn_speedup.addEventListener("click", speedUp, true);
    window.__btn_info.addEventListener("click", toggleStatus, true);
    window.document.body.addEventListener("keydown", keydown, true);
    window.document.body.addEventListener("wheel", wheel, true);
    window.document.body.addEventListener("mousemove", mousemove, true);
    window.__controls.addEventListener("mouseover", controlsMouseover, true);
    window.__controls.addEventListener("mouseout", controlsMouseout, true);


    if (localStorageOK()) {
        if (localStorage.getItem(LS_KEY_SPEED)){
            words.setSpeed(localStorage.getItem(LS_KEY_SPEED));
        }
        if (localStorage.getItem(LS_KEY_BUFFER)){
            words.init(localStorage.getItem(LS_KEY_BUFFER));
        }
        if (localStorage.getItem(LS_KEY_TITLE)){
            setDocumentTitle(localStorage.getItem(LS_KEY_TITLE));
        }
        if (localStorage.getItem(LS_KEY_POSITION)){
            words.setPosition(localStorage.getItem(LS_KEY_POSITION));
            displayWord(words.getCurrentWord());
        }
        if (localStorage.getItem(LS_KEY_THEME)){
            setTheme(localStorage.getItem(LS_KEY_THEME));
        }
    }

    if (rParams.speed) {
        words.setSpeed(rParams.speed);
    }
    if (rParams.theme) {
        setTheme(rParams.theme);
    }
    if (rParams.text) {
        words.init(decodeURIComponent(rParams.text));
        displayWord(words.getCurrentWord());
        updateTimeToGo();
        rDocumentTitle = "url";
    }
    if (rParams.pos) {
        words.setPosition(rParams.pos);
        displayWord(words.getCurrentWord());
    }
    if (rParams.loop && fmt.sanitizeBooleanesque(rParams.loop)) {
        rLoop = true;
    } else {
        rLoop = false;
    }
    if (rParams.play && fmt.sanitizeBooleanesque(rParams.play)) {
        window.setTimeout(play, INITIAL_DISPLAY_DELAY);
    }
    var rCannedTexts = {
      "thoughts": "samples/thoughts.txt",
      "1984":"samples/1984.txt",
      "freedom": "samples/freedom.txt",
      "intro": "samples/intro.txt",
      "laozi": "samples/laozi.txt"
    };
    if (!(rParams.text) && rParams.canned ){
        butl.ajax (decodeURIComponent(rCannedTexts[rParams.canned]), function(pEvent){
            words.init(pEvent.target.response);
            displayWord(words.getCurrentWord());
            updateTimeToGo();
            rDocumentTitle = rParams.canned;
        }, function (){
            // toast("Can't load that :-/");
        }
        );
    }
    if (!(rParams.text) && rParams.url ){
        butl.ajax (decodeURIComponent(rParams.url), function(pEvent){
            words.init(pEvent.target.response);
            displayWord(words.getCurrentWord());
            updateTimeToGo();
            rDocumentTitle = rParams.url;
        }, function (){
            // toast("Can't load that :-/");
        }
        );
    }
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
