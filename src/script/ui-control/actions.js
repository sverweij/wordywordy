/* eslint no-undefined:0, max-statements:0 */
define(function (require) {
  "use strict";

  var chopper = require("../chopper/chopper");
  var formatting = require("../utl/formatting");
  var stopwatch = require("../utl/stopwatch");
  var $ = require("../utl/browserutl");
  var gaga = require("../utl/gaga");
  var constants = require("../ui-control/constants");
  var themeswitcher = require("../ui-control/themeswitcher");

  require("../../lib/screenfull");

  var rPlaying = false;
  var rWordsPlayed = 0;

  var rWordTimer = null;
  var rToastTimer = null;
  var rControlsTimer = null;
  var rHoveringOverControls = false;
  var rShowStatus = false;
  var rLoop = false;
  var rDocumentTitle = "";
  var rAppName = "WordyWordy";

  var CH_PLAY = "\u25B7"; // or \u23F5 which not available in std font
  var ICON_PLAY_CLASS = "icon-play3";
  var ICON_PAUSE_CLASS = "icon-pause2";

  var MILLISECONDS_PER_MINUTE = 60000; // milliseconds
  var TOAST_FADE_TIME = 2200; // milliseconds

  var rStopwatch = new stopwatch.Stopwatch();

  /* +++ driving the timer */
  function outputNextWord() {
    if (rWordTimer) {
      window.clearTimeout(rWordTimer);
    }
    if (rLoop === true) {
      window.__output.className = "playing";
    }

    if (rPlaying) {
      if (chopper.getPosition() < chopper.getLength()) {
        rWordTimer = window.setTimeout(
          outputNextWord,
          chopper.getDisplayTime()
        );
        displayWord(chopper.getCurrentWord(), true);
        chopper.incPosition(1);
      } else if (rLoop === true) {
        chopper.setPosition(0);
        window.__output.className = "reload";
        rWordTimer = window.setTimeout(outputNextWord, 1000);
      } else {
        window.__output.textContent = "";
        window.__output.className = "smile";
        pause();
      }
    }
  }

  /* +++ driving the timer - updates dom */
  function displayWord(pWord, pAddsToPlayedCount) {
    if (undefined !== pWord) {
      window.__output.textContent = pWord;
      window.__percentage.setAttribute(
        "style",
        "width: " + chopper.getPercentage() + "%;"
      );
      if (rShowStatus) {
        updateStatus();
      }
      if (pAddsToPlayedCount) {
        rWordsPlayed++;
      }
    }
  }

  /* +++  - updates dom */
  function updateStatus() {
    var lTimeElapsed = rStopwatch.getTimeElapsed();
    var lMinutesRead = lTimeElapsed / MILLISECONDS_PER_MINUTE;

    var lActualSpeed = lMinutesRead > 0 ? rWordsPlayed / lMinutesRead : 0;
    var lTimeToGo = chopper.getEstimatedTimeToGo();
    var lTimeTotal = lTimeElapsed + lTimeToGo;

    window.__documentTitle.textContent = rDocumentTitle;
    window.__selectedSpeed.textContent = chopper.getSpeed().toFixed(0);
    window.__actualSpeed.textContent = lActualSpeed.toFixed(0);
    window.__position.textContent = chopper.getPosition();
    window.__positionInPercent.textContent = chopper.getPercentage().toFixed(1);
    window.__wordsPlayed.textContent = rWordsPlayed;
    window.__wordsTotal.textContent = chopper.getLength();

    window.__timeElapsed.textContent = formatting.formatTime(lTimeElapsed);
    window.__timeToGo.textContent = formatting.formatTime(lTimeToGo);
    window.__timeTotal.textContent = formatting.formatTime(lTimeTotal);
  }

  function toggleStatus() {
    rShowStatus = !rShowStatus;
    if (rShowStatus) {
      window.__status.style.display = "inline";
      updateStatus();
    } else {
      window.__status.style.display = "none";
    }
    gaga.g("send", "event", "app", "status-toggle");
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
    if ($.localStorageOK()) {
      localStorage.setItem("position", chopper.getPosition());
    }
  }

  /* +++ FE helper */
  function toastControls() {
    if (rControlsTimer) {
      window.clearTimeout(rControlsTimer);
    }
    window.__controls.className = "";
    window.__actionbar.className = "";
    rControlsTimer = window.setTimeout(function () {
      window.__controls.className = "fade-away";
      window.__actionbar.className = "fade-away";
    }, TOAST_FADE_TIME);
  }

  /* +++ FE helper */
  function toast(pString) {
    if (rToastTimer) {
      window.clearTimeout(rToastTimer);
    }
    window.__toast.style.display = "block";
    window.__toast.className = "";
    window.__toast.innerHTML = pString;
    rToastTimer = window.setTimeout(function () {
      window.__toast.className = "fade-away";
    }, TOAST_FADE_TIME);
  }

  /* +++ FE helper - responsibility mix? */
  function setDocumentTitle(pString) {
    rDocumentTitle = pString;

    if ($.localStorageOK()) {
      localStorage.setItem(constants.LS_KEY_TITLE, pString);
    }
  }

  function updateNavigation(pPause) {
    if (pPause) {
      pause();
    }
    displayWord(chopper.getCurrentWord(), false);
    toast(chopper.getPercentage().toFixed(1) + "%");
  }

  function updateSpeed(pSpeed) {
    updateStatus();
    toast(pSpeed.toFixed(0) + " wpm");
    if ($.localStorageOK()) {
      localStorage.setItem(constants.LS_KEY_SPEED, pSpeed);
    }
  }

  function showTimeToGo() {
    toast(
      "<span class='icon-stopwatch'></span> -" +
        formatting.formatTime(chopper.getEstimatedTimeToGo())
    );
  }

  function cycleTheme() {
    themeswitcher.cycleTheme();
    toast(themeswitcher.getCurrentTheme().title);
    if ($.localStorageOK()) {
      localStorage.setItem(
        constants.LS_KEY_THEME,
        themeswitcher.getCurrentTheme().nr
      );
    }
    gaga.g("send", "event", "app", "theme-cycle");
  }

  function setTheme(pThemeNumber) {
    themeswitcher.setTheme(pThemeNumber);
    toast(themeswitcher.getCurrentTheme().title);
    if ($.localStorageOK()) {
      localStorage.setItem(
        constants.LS_KEY_THEME,
        themeswitcher.getCurrentTheme().nr
      );
    }
    gaga.g("send", "event", "app", "theme-set");
  }

  function openFile() {
    updateNavigation(true);
    window.__input_file.click();
  }
  function setPos(pPosition) {
    chopper.setPosition(pPosition);
    updateNavigation(false);
  }
  function setPosFraction(pFraction) {
    setPos(Math.floor(pFraction * chopper.getLength()));
    gaga.g("send", "event", "app", "position-fraction");
  }
  function home() {
    setPos(0);
    gaga.g("send", "event", "app", "position-home");
  }
  function dec(pDoNotTag) {
    chopper.decPosition(1);
    updateNavigation(true);
    if (!pDoNotTag) {
      gaga.g("send", "event", "app", "position-previous-word");
    }
  }
  function playpause() {
    rPlaying = !rPlaying;
    if (rPlaying) {
      play();
    } else {
      pause();
    }
    gaga.g("send", "event", "app", "play-pause");
  }
  function inc(pDoNotTag) {
    chopper.incPosition(1);
    updateNavigation(true);
    if (!pDoNotTag) {
      gaga.g("send", "event", "app", "position-next-word");
    }
  }
  function end() {
    setPos(chopper.getLength());
    gaga.g("send", "event", "app", "position-end");
  }

  function speedUp() {
    chopper.incSpeed(5);
    updateSpeed(chopper.getSpeed());
    gaga.g("send", "event", "app", "speed-up");
  }
  function slowDown() {
    chopper.decSpeed(5);
    updateSpeed(chopper.getSpeed());
    gaga.g("send", "event", "app", "speed-slow-down");
  }
  function setSpeed(pSpeed) {
    chopper.setSpeed(pSpeed);
    updateSpeed(chopper.getSpeed());
    gaga.g("send", "event", "app", "speed-set");
  }
  function setSpeedFraction(pFraction) {
    chopper.setSpeedFraction(pFraction);
    updateSpeed(chopper.getSpeed());
    gaga.g("send", "event", "app", "speed-set-fraction");
  }
  function gotoStartOfNextSentence() {
    chopper.gotoStartOfNextSentence();
    updateNavigation(false);
    gaga.g("send", "event", "app", "position-start-of-next-sentence");
  }
  function gotoStartOfNextParagraph() {
    chopper.gotoStartOfNextParagraph();
    updateNavigation(false);
    gaga.g("send", "event", "app", "position-start-of-next-paragraph");
  }
  function gotoStartOfSentence() {
    chopper.gotoStartOfSentence();
    updateNavigation(true);
    gaga.g("send", "event", "app", "position-start-of-sentence");
  }
  function savePosition() {
    if ($.localStorageOK()) {
      localStorage.setItem(constants.LS_KEY_POSITION, chopper.getPosition());
    }
    toast("position saved");
    gaga.g("send", "event", "app", "position-save");
  }
  function initiateText(pText, pTitle) {
    rWordsPlayed = 0;
    window.__output.className = "";
    if ($.localStorageOK()) {
      localStorage.setItem(constants.LS_KEY_BUFFER, pText);
    }
    chopper.init(pText);
    window.__avgSpeed.textContent = chopper.getAverageSpeed().toFixed(1);
    rStopwatch.reset();
    displayWord(chopper.getCurrentWord(), false);
    showTimeToGo();
    setDocumentTitle(pTitle);
  }
  function setLooping(pBoolean) {
    rLoop = pBoolean;
  }
  function forgetEverything() {
    initiateText("", "");
    if ($.localStorageOK()) {
      localStorage.removeItem(constants.LS_KEY_BUFFER);
      localStorage.removeItem(constants.LS_KEY_TITLE);
      localStorage.removeItem(constants.LS_KEY_POSITION);
      localStorage.removeItem(constants.LS_KEY_SPEED);
      localStorage.removeItem(constants.LS_KEY_THEME);
    }
    home();
    toast("Forgot everything");
    gaga.g("send", "event", "app", "forget-everything");
  }

  function toggleFullscreen() {
    if (window.screenfull.enabled) {
      window.screenfull.toggle();
    }
    gaga.g("send", "event", "app", "toggle-fullscreen");
  }

  function mousemove() {
    if (!rHoveringOverControls) {
      toastControls();
    }
  }
  function controlsMouseover() {
    if (rControlsTimer) {
      window.clearTimeout(rControlsTimer);
    }
    rHoveringOverControls = true;
    window.__controls.className = "";
    window.__actionbar.className = "";
  }
  function controlsMouseout() {
    rHoveringOverControls = false;
  }
  function getDocumentTitle() {
    return rDocumentTitle;
  }
  return {
    toggleStatus: toggleStatus,
    play: play,
    pause: pause,
    toast: toast,
    showTimeToGo: showTimeToGo,
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
    gotoStartOfNextParagraph: gotoStartOfNextParagraph,
    gotoStartOfSentence: gotoStartOfSentence,
    savePosition: savePosition,
    initiateText: initiateText,
    setLooping: setLooping,
    forgetEverything: forgetEverything,
    toggleFullscreen: toggleFullscreen,
    mousemove: mousemove,
    controlsMouseover: controlsMouseover,
    controlsMouseout: controlsMouseout,
    getDocumentTitle: getDocumentTitle,
    setDocumentTitle: setDocumentTitle,
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
