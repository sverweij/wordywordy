/* jshint browser:true */
/* jshint nonstandard:true */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["../chopper/chopper",
        "../utl/formatting",
        "../utl/stopwatch",
        "../utl/paramslikker"],
        function(
        words,
        fmt,
        stopwatch,
        paramslikker
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
            window.__output.innerHTML = pWord;
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
      "choo-choo": "Don't ask me silly questions, I won't play silly games. I'm just a simple choo-choo train, and I'll always be the same. I only want to race along, beneath the bright blue sky. And be a happy choo-choo train until the day I die.",
      "thoughts": "Watch your thoughts, for they become words.\n\nWatch your words, for they become actions.\n\nWatch your actions, for they become habits.\n\nWatch your habits, for they become character.\n\n Watch your character, for it becomes your destiny.",
      "1984":"DOWN WITH BIG BROTHER!\nDOWN WITH BIG BROTHER!\nDOWN WITH BIG BROTHER!",
      "freedom": "War is peace, freedom is slavery, ignorance is strength. If you want a vision of the future, imagine a boot stamping on a human face - forever.",
      "dao de jing":"老子《道德經》 第一~四十章\n\n老子道經\n\n第一章\n\n道可道，非常道。名可名，非常名。無，名天地之始﹔有，名萬物之母。\n故常無，欲以觀其妙；常有，欲以觀其徼。此兩者，同出而異名，同謂之\n玄。玄之又玄，眾妙之門。\n\n第二章\n\n天下皆知美之為美，斯惡矣﹔皆知善之為善，斯不善矣。故有無相生，難\n易相成，長短相形，高下相傾，音聲相和，前後相隨。是以聖人處「無為\n」之事，行「不言」之教。萬物作焉而不辭，生而不有，為而不恃，功成\n而弗居。夫唯弗居，是以不去。\n\n第三章\n\n不尚賢，使民不爭﹔不貴難得之貨，使民不為盜﹔不見可欲，使民心不亂\n。是以「聖人」之治，虛其心，實其腹，弱其志，強其骨。常使民無知無\n欲。使夫智者不敢為也。為「無為」，則無不治。\n\n第四章\n\n「道」沖，而用之或不盈。淵兮，似萬物之宗﹔挫其銳，解其紛，和其光\n，同其塵﹔湛兮似或存。吾不知誰之子？象帝之先。\n\n第五章\n\n天地不仁，以萬物為芻狗﹔聖人不仁，以百姓為芻狗。天地之間，其猶橐\n蘥乎？虛而不屈，動而愈出。多言數窮，不如守中。\n\n第六章\n\n谷神不死，是謂玄牝。玄牝之門，是謂天地根。綿綿若存，用之不勤。\n\n第七章\n\n天長地久。天地所以能長且久者，以其不自生，故能長久。是以聖人後其\n身而身先，外其身而身存。非以其無私邪？故能成其私。\n\n第八章\n\n上善若水。水善利萬物而不爭。處眾人之所惡，故幾於道。居善地，心善\n淵，與善仁，言善信，政善治，事善能，動善時。夫唯不爭，故無尤。\n\n第九章\n\n持而盈之，不如其已﹔揣而銳之，不可長保。金玉滿堂，莫之能守﹔富貴\n而驕，自遺其咎。功遂身退，天之道。\n\n第十章\n\n載營魄抱一，能無離乎？專氣致柔，能嬰兒乎？滌除玄覽，能無疵乎？愛\n國治民，能無為乎？天門開闔，能為雌乎？明白四達，能無知乎？生之畜\n之，生而不有，為而不恃，長而不宰，是謂玄德。\n\n\n第十一章\n\n三十輻共一轂，當其無，有車之用。埏埴以為器，當其無，有器之用。鑿\n戶牖以為室，當其無，有室之用。故有之以為利，無之以為用。\n\n第十二章\n\n五色令人目盲﹔五音令人耳聾﹔五味令人口爽﹔馳騁畋獵，令人心發狂﹔\n難得之貨，令人行妨。是以聖人為腹不為目，故去彼取此。\n\n第十三章\n\n寵辱若驚，貴大患若身。何謂寵辱若驚？寵為下，得之若驚，失之若驚，\n是謂寵辱若驚。何謂貴大患若身？吾所以有大患者，為吾有身，及吾無身\n，吾有何患？故貴以身為天下，若可寄天下﹔愛以身為天下，若可托天下\n。\n\n第十四章\n\n視之不見，名曰「夷」﹔聽之不聞，名曰「希」﹔搏之不得，名曰「微」\n。此三者不可致詰，故混而為一。其上不皦，其下不昧。繩繩不可名，復\n歸於無物。是謂無狀之狀，無物之象，是謂惚恍。迎之不見其首，隨之不\n見其後。執古之道，以御今之有。能知古始，是謂道紀。\n\n第十五章\n\n古之善為士者，微妙玄通，深不可識。夫唯不可識，故強為之容：豫兮若\n冬涉川﹔猶兮若畏四鄰﹔儼兮其若客﹔渙兮若冰之釋﹔敦兮其若朴﹔曠兮\n其若谷﹔混兮其若濁。孰能晦以理之徐明？孰能濁以靜之徐清？孰能安以\n動之徐生？保此道者不欲盈。夫唯不盈，故能蔽而新成。\n\n第十六章\n\n致虛極，守靜篤，萬物並作，吾以觀復。夫物芸芸，各復歸其根。歸根曰\n靜，靜曰復命。復命曰常，知常曰明。不知常，妄作凶。知常容，容乃公\n。公乃王，王乃天，天乃道，道乃久，沒身不殆。\n\n第十七章\n\n太上，下不知有之﹔其次，親而譽之﹔其次，畏之﹔其次，侮之。信不足\n焉，有不信焉。悠兮其貴言。功成事遂，百姓皆謂：「我自然」。\n\n第十八章\n\n大道廢，有仁義﹔智慧出，有大偽﹔六親不和，有孝慈﹔國家昏亂，有忠\n臣。\n\n第十九章\n\n絕聖棄智，民利百倍﹔絕仁棄義，民復孝慈﹔絕巧棄利，盜賊無有。此三\n者，以為文不足。故令有所屬：見素抱朴，少私寡欲。\n\n第二十章\n\n絕學無憂。唯之與阿，相去幾何？善之與惡，相去若何？人之所畏，不可\n不畏。荒兮其未央哉！眾人熙熙，如享太牢，如登春台。我獨泊兮其未兆\n，如嬰兒之未孩。    兮，若無所歸。眾人皆有餘，而我獨若遺。我愚人\n之心也哉！沌沌兮。俗人昭昭，我獨昏昏。俗人察察，我獨悶悶。澹兮其\n若海，飉兮若無止。眾人皆有以，我獨頑且鄙。我獨異於人，而貴食母。\n\n第二十一章\n\n孔德之容，惟道是從。道之為物，惟恍惟惚。惚兮恍兮，其中有象﹔恍兮\n惚兮，其中有物。窈兮冥兮，其中有精﹔其精甚真，其中有信。自今及古\n，其名不去，以閱眾甫。吾何以知眾甫之狀哉？以此。\n\n第二十二章\n\n曲則全，枉則直，窪則盈，敝則新，少則多，多則惑。是以聖人抱一為天\n下式。不自見，故明﹔不自是，故彰﹔不自伐，故有功﹔不自矜，故長。\n夫唯不爭，故天下莫能與之爭。古之所謂「曲則全」者，豈虛言哉！誠全\n而歸之。\n\n\n第二十三章\n\n希言自然。故飄風不終朝，驟雨不終日。孰為此者？天地。天地尚不能久\n，而況于人乎？故從事于道者，同于道﹔德者，同于德﹔失者，同于失。\n同于道者，道亦樂得之﹔同于德者，德亦樂得之﹔于失者，失亦樂得之。\n信不足焉，有不信焉。\n\n第二十四章\n\n企者不立﹔跨者不行﹔自見者不明﹔自是者不彰﹔自伐者無功﹔自矜者不\n長。其在道也，曰：餘食贅形。物或惡之，故有道者不處。\n\n第二十五章\n\n有物混成，先天地生。寂兮寥兮，獨立而不改，周行而不殆，可以為天地\n母。吾不知其名，強字之曰道，強為之名曰大。大曰逝，逝曰遠，遠曰反\n。故道大，天大，地大，人亦大。域中有四大，而人居其一焉。人法地，\n地法天，天法道，道法自然。\n\n第二十六章\n\n重為輕根，靜為躁君。是以君子終日行不離輜重。雖有榮觀，燕處超然。\n奈何萬乘之主，而以身輕天下？輕則失根，躁則失君。\n\n第二十七章\n\n善行，無轍跡，善言，無瑕謫﹔善數，不用籌策﹔善閉，無關楗而不可開\n，善結，無繩約而不可解。是以聖人常善救人，故無棄人﹔常善救物，故\n無棄物。是謂襲明。故善人者，不善人之師﹔不善人者，善人之資。不貴\n其師，不愛其資，雖智大迷，是謂要妙。\n\n第二十八章\n\n知其雄，守其雌，為天下谿。為天下谿，常德不離，復歸于嬰兒。知其白\n，守其黑，為天下式，常德不忒，復歸于無極。知其榮，守其辱，為天下\n谷。為天下谷，常德乃足，復歸于朴。為天下式。朴散則為器，聖人用之\n，則為官長，故大制不割。\n\n第二十九章\n\n將欲取天下而為之，吾見其不得已。天下神器，不可為也，不可執也。為\n者敗之，執者失之。故物或行或隨，或噓或吹，或強或羸，或載或隳，是\n以聖人去甚，去奢，去泰。\n\n第三十章\n\n以道佐人主者，不以兵強天下。其事好還。師之所處，荊棘生焉。大軍之\n后，必有凶年。善者果而已，不敢以取強。果而勿矜，果而勿伐，果而勿\n驕。果而不得已，果而勿強。物壯則老，是謂不道，不道早已。\n\n第三十一章\n\n夫佳兵者，不祥之器，物或惡之，故有道者不處。君子居則貴左，用兵則\n貴右。兵者不祥之器，非君子之器，不得已而用之，恬淡為上。勝而不美\n，而美之者，是樂殺人。夫樂殺人者，則不可得志于天下矣。吉事尚左，\n凶事尚右。偏將軍居左，上將軍居右，言以喪禮處之。殺人之眾，以悲哀\n泣之，戰勝以喪禮處之。\n\n第三十二章\n\n道常無名，朴雖小，天下莫能臣。侯王若能守之，萬物將自賓。天地相合\n，以降甘露，民莫之令而自均。始制有名，名亦既有，夫亦將知止，知止\n可以不殆。譬道之在天下，猶川谷之于江海。\n\n第三十三章\n\n知人者智，自知者明。勝人者有力，自勝者強。知足者富。強行者有志。\n不失其所者久。死而不亡者壽。\n\n第三十四章\n\n大道氾兮，其可左右。萬物恃之以生而不辭，功成不名有，衣養萬物而不\n為主。常無欲，可名于小﹔萬物歸焉而不為主，可名為大。以其終不自為\n大，故能成其大。\n\n第三十五章\n\n執大象，天下往。往而不害，安平太。樂與餌，過客止。道之出口，淡乎\n其無味。視之不足見，聽之不足聞，用之不足既。\n\n第三十六章\n\n將欲歙之，必固張之﹔將欲弱之，必固強之﹔將欲廢之，必固興之﹔將欲\n取之，必固與之。是謂微明。柔勝剛，弱勝強。魚不可脫于淵，國之利器\n，不可以示人。\n\n第三十七章\n\n道常無為而無不為。侯王若能守之，萬物將自化。化而欲作，吾將鎮之以\n無名之朴。鎮之以無名之朴，夫亦將不欲。不欲以靜，天下將自正。\n\n\n老子德經",
      "intro": "Thank you for your interest in WordyWordy! As you might have surmised, WordyWordy displays text. One word at a time. At the speed you want it to.\n\nThe speed at which you are reading this is 150 words per minute. If this is not right for you, you can change it with the {up} and {down} keys on your keyboard. If you don't have a keyboard, click or tap the middle top of the screen to speed up and the middle bottom of the screen to slow down.\n\nGo on.\n\nAdjust it while you are at it. Faster={up}. Slower={down}.\n\nHere is some text to test if the reading speed is comfortable, while you are twiddling the {up} and {down} keys. (What? You weren't? go on! {up} , {up} , {up}!). As a reference: when you are an average adult person you will probably read books and papers at a rate of about 240 words per minute. When that seems too fast for you: RELAX. You're NOT AVERAGE. Being NOT AVERAGE is TOTALY OK. Even better: WordyWordy was created with you in mind.\n\nOn the other hand, if faster seems to do it for you: knock yourself out! There's people who claim they can read at 400 words per minute. There's even people who claim they can read faster than that, although I don't believe them :-).\n\nNow that your reading speed is adjusted to your comfort level, you might want to know some things. I'll tick them off in order of likelihood:\n\n1. -->WHY?<--\n\nWhy would people read text in this way? I have identified several of them:\n1. Low vision.\n2. Dyslexia.\n3. Hands free reading.\n4. Speed reading.\n\n1/4  Low vision\n\nYou might have noticed the letters are BIG. And you don't have to move your eyes a lot. This can be practical for people with low vision. There is even a special HIGH CONTRAST theme (accessible under the {5} (five) key of your keyboard).\n\n\n2/4 Dyslexia\n\nI have read claims (but not proof) that people with dyslexia can absorb text better this way. I have no idea whether or not that is true. Just in case it is, WordyWordy has some themes that sport dyslexia friendly fonts. A dyslexia friendly front is bottom heavy. Letters in a dyslexia friendly font are as distinct from each other as possible.\n\nIf you want to see the dyslexia font in action, you can hit the {6} (six) key on your keyboard. You can hit {1} to go back to the regular font.\n\n\n3/4 Hands free reading\n\nWell, this is self evident. You didn't have to scroll one bit while reading this. You can step on your home trainer and have WordyWordy read a book to you. Or do push-ups.\n\n\n4/4 Speed reading\n\nIt is also claimed, although I haven't seen actual research supporting this, you can read faster like this. Exactly because your eyes don't have to move to the start of the next line again.\n\nThe second thing you might want to know...\n\n2. How do I navigate through the text?\n\nIf you want to pause text display, hit your {space} bar, or click/ tap on the {>} button in the controls island.\n\nWait. Controls island? What are you talking about?\n\nThe controls island is the thing that keeps popping in and out of view while you move your mouse.\n\nHitting the {space} bar or the {>} one of these again will make WordyWordy resume reading from the current position.\n\nThere's a lot of ways to move back and forth through the text. You can use the {left} and {right} keys on your keyboard. You can use the {<<} and {>>} buttons on the controls island. You can use the {scroll} wheel on your mouse.\n\nIf you are an advanced reader, you might be happy to know WordyWordy supports like navigating sentences or paragraphs at a time. If you're interested, take a peek at the (short but concise) documentation on github.\n\nThe third thing you might want to know...\n\n3. How do I get this to read MY text?\n\nCurrently there are three ways to do this: copy/ paste, drag/ drop, open file. There is a fourth one but that is an itty bitty technical (URL). You can look it up on the github home page of this project if you want to.\n\nGetting text into WordyWordy 1/3: copy/ paste\nCopy some text and paste it on the horizontal line in the middle of the screen (or thereabouts). WordyWordy will start reading it to you at its current speed (which you can adjust, remember? {up} {down}).\n\nGetting text into WordyWordy 2/3: drag/ drop\nSelect a file on you desktop computer and drag it over to the horizontal line in the middle of the screen and drop it there. You'll know you do it right when WordyWordy smiles at you.\n\nGetting text into WordyWordy 3/3: open file\nYou might have noticed the {FOLDER} icon on the bottom of this screen (if it's not in view, move your mouse a bit or tap the middle of the screen). When you click it, WordyWordy will open your browser's upload dialog. With this, select a text file you want it to read. When done, WordyWordy will read it to you. We have tested this with pretty big text files (900 kilobytes).\n\nJust remember that, at this time, WordyWordy only knows how to handle plain text files, so it doesn't know what to do with word documents or ebook formats like ePub. I might want to tell it some day, but it will take some time...\n\nHey you! <b>Wow</b>! Thanks for reading up to here! You're <em>awesome</em>. If you left the speed to 150 words per minute, it will have taken you about five and a half minutes. It will have take you a lot less than that if you increased the reading speed. Want to know exactly how much of your time I have taken? And how much words were in this piece of text? Hit the {.} (dot) or {,} (comma) key after WordyWordy has given its smile and you'll see the nerdy stats."
    };
    if (!(rParams.text) && rParams.canned && rCannedTexts[rParams.canned]){
      words.init(rCannedTexts[rParams.canned]);
      displayWord(words.getCurrentWord());
      updateTimeToGo();
      rDocumentTitle = rParams.canned;
    }
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
