/* jshint browser:true */
/* jshint nonstandard:true */
/* global define */
define(["./actions"], function(actions) {
    "use strict";

    var rCode2Key = {
        0   : "SECTION_KEY_FF",// on FF this is the ` (backquote)
        9   : "TAB_KEY",
        13  : "ENTER_KEY",
        188 : "COMMA_KEY",
        190 : "DOT_KEY",
        191 : "SLASH_KEY",
        192 : "SECTION_KEY",// in safari both the § and ` key listen to 192
        32  : "SPACE_KEY",
        33  : "PAGEUP_KEY",
        34  : "PAGEDOWN_KEY",
        35  : "END_KEY",
        36  : "HOME_KEY",
        37  : "LEFT_KEY",
        38  : "UP_KEY",
        39  : "RIGHT_KEY",
        40  : "DOWN_KEY",
        48  : "ZERO_KEY",
        49  : "ONE_KEY",
        50  : "TWO_KEY",
        51  : "THREE_KEY",
        52  : "FOUR_KEY",
        53  : "FIVE_KEY",
        54  : "SIX_KEY",
        55  : "SEVEN_KEY",
        56  : "EIGHT_KEY",
        57  : "NINE_KEY",
        65  : "A_KEY",
        66  : "B_KEY",
        67  : "C_KEY",
        68  : "D_KEY",
        69  : "E_KEY",
        70  : "F_KEY",
        73  : "I_KEY",
        79  : "O_KEY",
        81  : "Q_KEY",
        82  : "R_KEY",
        83  : "S_KEY",
        84  : "T_KEY",
        87  : "W_KEY"
    };
    var rKey2Func = {
        HOME_KEY       : {func: actions.home },
        END_KEY        : {func: actions.end },
        I_KEY          : {func: actions.toggleStatus },
        C_KEY          : {func: actions.forgetEverything },
        T_KEY          : {func: actions.updateTimeToGo },
        SPACE_KEY      : {func: actions.playpause },
        ENTER_KEY      : {func: actions.playpause },
        LEFT_KEY       : {func: actions.dec },
        A_KEY          : {func: actions.dec },
        PAGEDOWN_KEY   : {func: actions.gotoStartOfNextSentence },
        E_KEY          : {func: actions.gotoStartOfNextSentence },
        R_KEY          : {func: actions.gotoStartOfNextParagraph },
        RIGHT_KEY      : {func: actions.inc },
        D_KEY          : {func: actions.inc },
        PAGEUP_KEY     : {func: actions.gotoStartOfSentence },
        Q_KEY          : {func: actions.gotoStartOfSentence },
        DOWN_KEY       : {func: actions.slowDown },
        S_KEY          : {func: actions.slowDown },
        UP_KEY         : {func: actions.speedUp },
        W_KEY          : {func: actions.speedUp },
        O_KEY          : {func: actions.openFile },
        B_KEY          : {func: actions.savePosition },
        F_KEY          : {func: actions.toggleFullscreen },
        ONE_KEY        : {func: actions.setTheme, arg: 1},
        TWO_KEY        : {func: actions.setTheme, arg: 2},
        THREE_KEY      : {func: actions.setTheme, arg: 3},
        FOUR_KEY       : {func: actions.setTheme, arg: 4},
        FIVE_KEY       : {func: actions.setTheme, arg: 5},
        SIX_KEY        : {func: actions.setTheme, arg: 6},
        SEVEN_KEY      : {func: actions.setTheme, arg: 7},
        EIGHT_KEY      : {func: actions.setTheme, arg: 8},
        NINE_KEY       : {func: actions.setTheme, arg: 9},
        ZERO_KEY       : {func: actions.setTheme, arg: 10},
        SECTION_KEY    : {func: actions.cycleTheme},
        SECTION_KEY_FF : {func: actions.cycleTheme}
    };

    var rReader      = new FileReader();
    var rLoadedTitle = "";

    /* event handling */
    function paste(pEvent){
        if (pEvent && pEvent.clipboardData) {
            actions.initiateText(pEvent.clipboardData.getData("text/plain"), "clipboard");
            actions.play();
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
        window.__output.className="";
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
        window.__output.className = "";
    }

    function percentageClick(pEvent) {
        var lSelectedPosition = pEvent.clientX/window.__percentagewrap.scrollWidth;
        actions.setPosFraction(lSelectedPosition);
    }

    function keydown (pEvent) {
        if (rKey2Func[rCode2Key[pEvent.keyCode]]){
            if (undefined !== rKey2Func[rCode2Key[pEvent.keyCode]].arg) {
                rKey2Func[rCode2Key[pEvent.keyCode]].func(
                        rKey2Func[rCode2Key[pEvent.keyCode]].arg
                );
            } else {
                rKey2Func[rCode2Key[pEvent.keyCode]].func();
            }
        }
        /*
         * to prevent keystrokes getting characters into the drop area ...
         */
        window.__droparea.value = "";
    }

    function wheel (pEvent){
        pEvent.preventDefault();
        if (pEvent.deltaY) {
            if (pEvent.deltaY > 0){
                actions.inc();
            } else if(pEvent.deltaY < 0)  {
                actions.dec();
            }
        } else if ( pEvent.deltaX && pEvent.deltaX !== 0 &&
                    pEvent.deltaY === 0){
            if (pEvent.deltaX > 0){
                actions.dec(); // not a typo
            } else if(pEvent.deltaX < 0)  {
                actions.inc(); // not a typo
            }
        }
    }

    function loadend (pEvent){
        if (pEvent && pEvent.target && pEvent.target.result) {
            actions.initiateText(pEvent.target.result, rLoadedTitle);
            actions.play();
        }
    }

    rReader.addEventListener("loadend", loadend);

    function inputFileOnChange (pEvent){
        if (pEvent.target.files.length > 0){
            var lFile = pEvent.target.files[0];
            if (lFile.type === "text/plain"){
                rReader.readAsText(lFile);
                rLoadedTitle = lFile.name;
            }
        }
    }
    function drop(pEvent){
        window.__output.className = "playing";
        if (pEvent.dataTransfer.files.length > 0){
            var lFile = pEvent.dataTransfer.files[0];
            if (lFile.type === "text/plain"){
                rReader.readAsText(lFile);
                rLoadedTitle = lFile.name;
            }
        } else {
            if (hasTextMime(pEvent.dataTransfer.types)) {
                actions.initiateText(pEvent.dataTransfer.getData("text/plain"), "drag/ drop");
                actions.play();
            }
        }
        pEvent.preventDefault();
    }

    function hasTextMime(pKindOfIterableObject){
        for (var i=0;i<pKindOfIterableObject.length;i++){
            if ("text/plain" === pKindOfIterableObject[i]) {
                return true;
            }
        }
        return false;
    }

    function addEventListeners(){
        window.__droparea.addEventListener("drag", drag, true);
        window.__droparea.addEventListener("dragenter", dragEnter, true);
        window.__droparea.addEventListener("dragleave", dragLeave, true);
        window.__droparea.addEventListener("dragstart", dragStart, true);
        window.__droparea.addEventListener("dragover", dragOver, true);
        window.__droparea.addEventListener("dragend", dragEnd, true);
        window.__droparea.addEventListener("paste", paste, true);
        window.__droparea.addEventListener("drop", drop, true);
        window.__percentagewrap.addEventListener("click", percentageClick, true);
        window.__rightarea.addEventListener("click", actions.playpause, true);
        window.__input_file.addEventListener("change", inputFileOnChange, true);
        window.__btn_open.addEventListener("click", actions.openFile, true);
        window.__btn_theme.addEventListener("click", actions.cycleTheme, true);
        window.__btn_home.addEventListener("click", actions.gotoStartOfSentence, true);
        window.__btn_dec.addEventListener("click", actions.dec, true);
        window.__btn_playpause.addEventListener("click", actions.playpause, false);
        window.__btn_inc.addEventListener("click", actions.inc, true);
        window.__btn_end.addEventListener("click", actions.gotoStartOfNextSentence, true);
        window.__btn_paragraph.addEventListener("click", actions.gotoStartOfNextParagraph, true);
        window.__btn_slowdown.addEventListener("click", actions.slowDown, true);
        window.__btn_speedup.addEventListener("click", actions.speedUp, true);
        window.__btn_fullscreen.addEventListener("click", actions.toggleFullscreen, true);
        window.__btn_info.addEventListener("click", actions.toggleStatus, true);
        window.document.body.addEventListener("keydown", keydown, true);
        window.document.body.addEventListener("wheel", wheel, true);
        window.document.body.addEventListener("mousemove", actions.mousemove, true);
        window.__controls.addEventListener("mouseover", actions.controlsMouseover, true);
        window.__controls.addEventListener("mouseout", actions.controlsMouseout, true);
        window.__actionbar.addEventListener("mouseover", actions.controlsMouseover, true);
        window.__actionbar.addEventListener("mouseout", actions.controlsMouseout, true);
    }
    return {
        addEventListeners: addEventListeners
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
