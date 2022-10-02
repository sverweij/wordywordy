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

/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/

define("utl/formatting",[],function(){"use strict";function e(e){var t=e/n,a=Math.max(0,t/o),s=Math.max(0,a/i),c=Math.max(0,s/r),u=Math.max(0,e-Math.floor(t)*n);return t=Math.max(0,t-Math.floor(a)*o),a=Math.max(0,a-Math.floor(s)*i),s=Math.max(0,s-Math.floor(c)*r),{days:Math.floor(c),hours:Math.floor(s),minutes:Math.floor(a),seconds:Math.floor(t),milliseconds:u}}function t(e){return e<10?"0"+e:e.toString()}var n=1e3,o=60,i=60,r=24;return{formatTime:function(n,o){var i=e(n);return o||(o=!1),(i.hours>0?i.hours+":":"")+t(i.minutes)+":"+t(i.seconds)+(o?"."+i.milliseconds:"")},sanitizeNumber:function(e,t){return"string"==typeof e&&(e=parseInt(e,10)),("number"!=typeof e||isNaN(e))&&(e=t),e},sanitizeBooleanesque:function(e){return["1","true","y","yes"].indexOf(e)>-1}}}),define("utl/paramslikker",[],function(){"use strict";return{getParams:function(e){var t={};if(e){var n=[];e.slice(1).split("&").forEach(function(e){n=e.split("="),2===n.length&&(t[n[0]]=unescape(n[1]))})}return t}}}),define("utl/browserutl",[],function(){"use strict";return{ajax:function(e,t,n){var o=new XMLHttpRequest;o.onreadystatechange=function(e){4!==e.target.readyState||e.target.status&&200!==e.target.status?n(e):t(e)},o.open("GET",e),o.responseType="text",o.send()},localStorageOK:function(){return"undefined"!=typeof localStorage},hasTextMime:function(e){return e.contains("text/plain")}}}),define("utl/gaga",[],function(){"use strict";var e=!0;return{gaSetup:function(t){e=t,window["ga-disable-UA-78467679-1"]=!e},g:function(t,n,o,i,r,a){!0===e&&window.ga&&ga.loaded&&ga(t,n,o,i,r,a)}}}),define("chopper/constants",[],function(){return{SPACES_RE:new RegExp("[ \f\n\r\t\v ᠎           \u2028\u2029  　]+"),SENTENCE_END_RE:new RegExp("[.?!。？]"),PARAGRAPH_END_RE:new RegExp(" "),CJK_RE:new RegExp("([⺀-⺙|⺛-⻳|⼀-⿕|々|〇|〡-〩|〸-〺|〻|㐀-䶵|一-鿌|豈-舘|並-龎|ꀀ-ꀔ|ꀕ|ꀖ-ꒌ|꒐-꓆|ᄀ-ᇿ|〮-〯|ㄱ-ㆎ|㈀-㈞|㉠-㉾|ꥠ-ꥼ|가-힣|ힰ-ퟆ|ퟋ-ퟻ|ﾠ-ﾾ|ￂ-ￇ|ￊ-ￏ|ￒ-ￗ|ￚ-ￜ])","g"),MILLISECONDS_PER_MINUTE:6e4}}),define("chopper/tokenizer",["require","./constants"],function(e){var t=e("./constants");return{tokenize:function(e){return e=e||"",e.replace(/[-]{4,}/g,"---").replace(/[_]{4,}/g,"___").replace(/[=]{4,}/g,"===").replace(/[+]{4,}/g,"+++").replace(/[~]{4,}/g,"~~~").replace(/\.\.\./g,"…").replace(/([a-zA-Z]{2,})([()[\]{}.?!:;\-,\u2026/|\u2010-\u2015]{1,2})([a-zA-Z]{2,})/g,"$1$2 $3").replace(/&nbsp;/g," ").replace(/\u00A0/g," ").replace(/\r\n/g,"\n").replace(/[\n]{2,}/g,"  ").replace(t.CJK_RE," $1").split(t.SPACES_RE)}}}),define("chopper/gear",["require","../utl/formatting","./constants"],function(e){function t(e){e=a.sanitizeNumber(e,u),T=Math.min(l,Math.max(c,e)),n(i(e))}function n(e){y=d*e,x=f*e,K=[{re:s.SENTENCE_END_RE,delay:S*e},{re:/[;:\u2026\u2013\u00B7|\u2010-\u2015]/,delay:w*e},{re:/[-,/\uFF0C]/,delay:h*e},{re:/[()[]{}]/,delay:m*e},{re:/["'\u2018\u2019\u201c\u201d]/,delay:E*e},{re:/\u00A0/,delay:v*e},{re:/[0-9=+]/,delay:g*e},{re:/[A-Z]/,delay:_*e},{re:s.CJK_RE,delay:p*e}]}function o(e){var t=K.filter(function(t){return t.re.test(e)});return t.length>0?t[0].delay:x}function i(e){return s.MILLISECONDS_PER_MINUTE/e/300}function r(e){return e?e.split("").reduce(function(e,t){return e+o(t)},y):0}var a=e("../utl/formatting"),s=e("./constants"),c=60,u=300,l=600,d=100,f=30,p=250,g=50,_=50,E=40,m=100,h=180,w=250,S=400,v=250,T=u,y=d*i(T),x=f*i(T),K=[];return{setSpeed:t,getSpeed:function(){return T},incSpeed:function(e){t(T+e)},decSpeed:function(e){t(T-e)},determineDisplayTime:r}}),define("chopper/navigator",["require","../utl/formatting","./constants"],function(e){function t(e){u=Math.min(c.length,Math.max(0,e))}function n(e){t(u+e)}function o(e){t(u-e)}function i(e){var t=!1,n=Math.min(u+s,c.length);for(u;!t&&u<n;u++)c[u]&&c[u].match(e)&&(t=!0)}var r=e("../utl/formatting"),a=e("./constants"),s=69,c=[],u=0;return{init:function(e,n){c=e,t(r.sanitizeNumber(n,0))},setPosition:t,incPosition:n,decPosition:o,getCurrentWord:function(){return c[u]},getLength:function(){return c.length},getPercentage:function(){return c.length>0?u/c.length*100:0},getPosition:function(){return u},gotoEndOfSentence:function(){var e=!1,t=Math.min(u+s,c.length);for(u;!e&&u<t;u++)c[u]&&c[u].match(a.SENTENCE_END_RE)&&(e=!0,u-=1)},gotoStartOfSentence:function(){var e=!1;c[u-1]&&c[u-1].match(a.SENTENCE_END_RE)&&o(1),c[u]&&c[u].match(a.SENTENCE_END_RE)&&o(1);var t=Math.max(u-s,0);for(u;!e&&u>t;u--)c[u]&&c[u].match(a.SENTENCE_END_RE)&&(e=!0,u+=2);Boolean(c[u])&&c[u].match(a.PARAGRAPH_END_RE)&&n(1)},gotoStartOfNextSentence:function(){i(a.SENTENCE_END_RE)},gotoStartOfNextParagraph:function(){i(a.PARAGRAPH_END_RE)}}}),define("chopper/chopper",["require","./tokenizer","./gear","./navigator","./constants"],function(e){"use strict";var t=e("./tokenizer"),n=e("./gear"),o=e("./navigator"),i=e("./constants"),r=[];return{init:function(e,n){r=t.tokenize(e),o.init(r,n)},getSpeed:n.getSpeed,setSpeed:n.setSpeed,incSpeed:n.incSpeed,decSpeed:n.decSpeed,getCurrentWord:o.getCurrentWord,getLength:o.getLength,getPercentage:o.getPercentage,getPosition:o.getPosition,setPosition:o.setPosition,incPosition:o.incPosition,decPosition:o.decPosition,gotoEndOfSentence:o.gotoEndOfSentence,gotoStartOfSentence:o.gotoStartOfSentence,gotoStartOfNextSentence:o.gotoStartOfNextSentence,gotoStartOfNextParagraph:o.gotoStartOfNextParagraph,getDisplayTime:function(){return n.determineDisplayTime(o.getCurrentWord())},getEstimatedTimeToGo:function(){return i.MILLISECONDS_PER_MINUTE*(o.getLength()-o.getPosition())/n.getSpeed()},getAverageSpeed:function(){var e=r.reduce(function(e,t){return e+n.determineDisplayTime(t)},0);return r.length/(e/i.MILLISECONDS_PER_MINUTE)}}}),define("utl/stopwatch",[],function(){"use strict";function e(){this.reset()}return e.prototype.reset=function(){this.state="paused",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},e.prototype.start=function(){this.state="running",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},e.prototype.resume=function(){this.state="running";var e=Date.now()-this.pauseStartTime;this.cumulativePauses+=e},e.prototype.pause=function(){"paused"!==this.state&&(this.state="paused",this.pauseStartTime=Date.now())},e.prototype.getTimeElapsed=function(){return"running"===this.state?Date.now()-this.startTime-this.cumulativePauses:this.pauseStartTime-this.startTime-this.cumulativePauses},{Stopwatch:e}}),define("ui-control/constants",[],function(){"use strict";return{LS_KEY_BUFFER:"buffer",LS_KEY_TITLE:"title",LS_KEY_POSITION:"position",LS_KEY_SPEED:"speed",LS_KEY_THEME:"theme"}}),define("ui-control/themeswitcher",["require","../utl/formatting"],function(e){"use strict";function t(){r++,r>=a.length&&(r=0),n(r)}function n(e){r=Math.max(Math.min(i.sanitizeNumber(e,1),a.length-1),0),window.customtheme.href=a[r].href}function o(){return a[r]}var i=e("../utl/formatting"),r=1,a=[{nr:0,title:"Zany",href:"style/themes/zany.css"},{nr:1,title:"Sepia",href:"style/themes/sepia.css"},{nr:2,title:"Day",href:"style/themes/day.css"},{nr:3,title:"Night",href:"style/themes/night.css"},{nr:4,title:"Low contrast",href:"style/themes/low-contrast.css"},{nr:5,title:"High contrast",href:"style/themes/high-contrast.css"},{nr:6,title:"Dyslexia - sepia",href:"style/themes/dyslexia-sepia.css"},{nr:7,title:"Dyslexia - day",href:"style/themes/dyslexia-day.css"},{nr:8,title:"Dyslexia - night",href:"style/themes/dyslexia-night.css"},{nr:9,title:"Dyslexia - low contrast",href:"style/themes/dyslexia-low-contrast.css"},{nr:10,title:"Dyslexia - high contrast",href:"style/themes/dyslexia-high-contrast.css"},{nr:11,title:"Low contrast fat font",href:"style/themes/low-contrast-fat-font.css"},{nr:12,title:"Sepia fat font",href:"style/themes/sepia-fat-font.css"},{nr:13,title:"Night fat font",href:"style/themes/night-fat-font.css"},{nr:14,title:"220",href:"style/themes/220.css"},{nr:15,title:"057",href:"style/themes/057.css"},{nr:16,title:"074",href:"style/themes/074.css"},{nr:17,title:"HV",href:"style/themes/hv.css"},{nr:18,title:"liberal",href:"style/themes/liberal.css"},{nr:19,title:"progressive",href:"style/themes/progressive.css"},{nr:20,title:"Fountain Pen",href:"style/themes/fountainpen.css"},{nr:21,title:"background",href:"style/themes/background.css"}];return{cycleTheme:t,setTheme:n,getCurrentTheme:o}}),function(){"use strict";var e="undefined"!=typeof window&&void 0!==window.document?window.document:{},t="undefined"!=typeof module&&module.exports,n=function(){for(var t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],o=0,i=n.length,r={};o<i;o++)if((t=n[o])&&t[1]in e){for(o=0;o<t.length;o++)r[n[0][o]]=t[o];return r}return!1}(),o={change:n.fullscreenchange,error:n.fullscreenerror},i={request:function(t,o){return new Promise(function(i,r){var a=function(){this.off("change",a),i()}.bind(this);this.on("change",a),t=t||e.documentElement;var s=t[n.requestFullscreen](o);s instanceof Promise&&s.then(a).catch(r)}.bind(this))},exit:function(){return new Promise(function(t,o){if(!this.isFullscreen)return void t();var i=function(){this.off("change",i),t()}.bind(this);this.on("change",i);var r=e[n.exitFullscreen]();r instanceof Promise&&r.then(i).catch(o)}.bind(this))},toggle:function(e,t){return this.isFullscreen?this.exit():this.request(e,t)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(t,n){var i=o[t];i&&e.addEventListener(i,n,!1)},off:function(t,n){var i=o[t];i&&e.removeEventListener(i,n,!1)},raw:n};if(!n)return void(t?module.exports={isEnabled:!1}:window.screenfull={isEnabled:!1});Object.defineProperties(i,{isFullscreen:{get:function(){return Boolean(e[n.fullscreenElement])}},element:{enumerable:!0,get:function(){return e[n.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(e[n.fullscreenEnabled])}}}),t?module.exports=i:window.screenfull=i}(),define("ui-control/../../lib/screenfull",function(){}),define("ui-control/actions",["require","../chopper/chopper","../utl/formatting","../utl/stopwatch","../utl/browserutl","../utl/gaga","../ui-control/constants","../ui-control/themeswitcher","../../lib/screenfull"],function(e){"use strict";function t(){V&&window.clearTimeout(V),!0===Q&&(window.__output.className="playing"),B&&(A.getPosition()<A.getLength()?(V=window.setTimeout(t,A.getDisplayTime()),n(A.getCurrentWord(),!0),A.incPosition(1)):!0===Q?(A.setPosition(0),window.__output.className="reload",V=window.setTimeout(t,1e3)):(window.__output.textContent="",window.__output.className="smile",a()))}function n(e,t){void 0!==e&&(window.__output.textContent=e,window.__percentage.setAttribute("style","width: "+A.getPercentage()+"%;"),J&&o(),t&&X++)}function o(){var e=se.getTimeElapsed(),t=e/re,n=t>0?X/t:0,o=A.getEstimatedTimeToGo(),i=e+o;window.__documentTitle.textContent=ee,window.__selectedSpeed.textContent=A.getSpeed().toFixed(0),window.__actualSpeed.textContent=n.toFixed(0),window.__position.textContent=A.getPosition(),window.__positionInPercent.textContent=A.getPercentage().toFixed(1),window.__wordsPlayed.textContent=X,window.__wordsTotal.textContent=A.getLength(),window.__timeElapsed.textContent=z.formatTime(e),window.__timeToGo.textContent=z.formatTime(o),window.__timeTotal.textContent=z.formatTime(i)}function i(){J=!J,J?(window.__status.style.display="inline",o()):window.__status.style.display="none",U.g("send","event","app","status-toggle")}function r(){se.resume(),B=!0,window.__output.className="playing",window.__btn_playpause.className=ie,document.title=ne+" "+ee+" - "+te,t()}function a(){se.pause(),B=!1,document.title=ee+" - "+te,window.__btn_playpause.className=oe,H.localStorageOK()&&localStorage.setItem("position",A.getPosition())}function s(){j&&window.clearTimeout(j),window.__controls.className="",window.__actionbar.className="",j=window.setTimeout(function(){window.__controls.className="fade-away",window.__actionbar.className="fade-away"},ae)}function c(e){Z&&window.clearTimeout(Z),window.__toast.style.display="block",window.__toast.className="",window.__toast.innerHTML=e,Z=window.setTimeout(function(){window.__toast.className="fade-away"},ae)}function u(e){ee=e,H.localStorageOK()&&localStorage.setItem(G.LS_KEY_TITLE,e)}function l(e){e&&a(),n(A.getCurrentWord(),!1),c(A.getPercentage().toFixed(1)+"%")}function d(e){o(),c(e.toFixed(0)+" wpm"),H.localStorageOK()&&localStorage.setItem(G.LS_KEY_SPEED,e)}function f(){c("<span class='icon-stopwatch'></span> -"+z.formatTime(A.getEstimatedTimeToGo()))}function p(){W.cycleTheme(),c(W.getCurrentTheme().title),H.localStorageOK()&&localStorage.setItem(G.LS_KEY_THEME,W.getCurrentTheme().nr),U.g("send","event","app","theme-cycle")}function g(e){W.setTheme(e),c(W.getCurrentTheme().title),H.localStorageOK()&&localStorage.setItem(G.LS_KEY_THEME,W.getCurrentTheme().nr),U.g("send","event","app","theme-set")}function _(){l(!0),window.__input_file.click()}function E(e){A.setPosition(e),l(!1)}function m(e){E(Math.floor(e*A.getLength())),U.g("send","event","app","position-fraction")}function h(){E(0),U.g("send","event","app","position-home")}function w(e){A.decPosition(1),l(!0),e||U.g("send","event","app","position-previous-word")}function S(){B=!B,B?r():a(),U.g("send","event","app","play-pause")}function v(e){A.incPosition(1),l(!0),e||U.g("send","event","app","position-next-word")}function T(){E(A.getLength()),U.g("send","event","app","position-end")}function y(){A.incSpeed(5),d(A.getSpeed()),U.g("send","event","app","speed-up")}function x(){A.decSpeed(5),d(A.getSpeed()),U.g("send","event","app","speed-slow-down")}function K(e){A.setSpeed(e),d(A.getSpeed()),U.g("send","event","app","speed-set")}function N(e){A.setSpeedFraction(e),d(A.getSpeed()),U.g("send","event","app","speed-set-fraction")}function Y(){A.gotoStartOfNextSentence(),l(!1),U.g("send","event","app","position-start-of-next-sentence")}function L(){A.gotoStartOfNextParagraph(),l(!1),U.g("send","event","app","position-start-of-next-paragraph")}function P(){A.gotoStartOfSentence(),l(!0),U.g("send","event","app","position-start-of-sentence")}function b(){H.localStorageOK()&&localStorage.setItem(G.LS_KEY_POSITION,A.getPosition()),c("position saved"),U.g("send","event","app","position-save")}function O(e,t){X=0,window.__output.className="",H.localStorageOK()&&localStorage.setItem(G.LS_KEY_BUFFER,e),A.init(e),window.__avgSpeed.textContent=A.getAverageSpeed().toFixed(1),se.reset(),n(A.getCurrentWord(),!1),f(),u(t)}function F(e){Q=e}function D(){O("",""),H.localStorageOK()&&(localStorage.removeItem(G.LS_KEY_BUFFER),localStorage.removeItem(G.LS_KEY_TITLE),localStorage.removeItem(G.LS_KEY_POSITION),localStorage.removeItem(G.LS_KEY_SPEED),localStorage.removeItem(G.LS_KEY_THEME)),h(),c("Forgot everything"),U.g("send","event","app","forget-everything")}function C(){window.screenfull.enabled&&window.screenfull.toggle(),U.g("send","event","app","toggle-fullscreen")}function I(){$||s()}function M(){j&&window.clearTimeout(j),$=!0,window.__controls.className="",window.__actionbar.className=""}function R(){$=!1}function k(){return ee}var A=e("../chopper/chopper"),z=e("../utl/formatting"),q=e("../utl/stopwatch"),H=e("../utl/browserutl"),U=e("../utl/gaga"),G=e("../ui-control/constants"),W=e("../ui-control/themeswitcher");e("../../lib/screenfull");var B=!1,X=0,V=null,Z=null,j=null,$=!1,J=!1,Q=!1,ee="",te="WordyWordy",ne="▷",oe="icon-play3",ie="icon-pause2",re=6e4,ae=2200,se=new q.Stopwatch;return{toggleStatus:i,play:r,pause:a,toast:c,showTimeToGo:f,setTheme:g,cycleTheme:p,openFile:_,setPos:E,setPosFraction:m,home:h,end:T,dec:w,playpause:S,inc:v,speedUp:y,slowDown:x,setSpeed:K,setSpeedFraction:N,gotoStartOfNextSentence:Y,gotoStartOfNextParagraph:L,gotoStartOfSentence:P,savePosition:b,initiateText:O,setLooping:F,forgetEverything:D,toggleFullscreen:C,mousemove:I,controlsMouseover:M,controlsMouseout:R,getDocumentTitle:k,setDocumentTitle:u}}),define("ui-control/eventmap",["require","./actions","../utl/browserutl","../utl/gaga"],function(e){"use strict";function t(e){e&&e.clipboardData&&(w.initiateText(e.clipboardData.getData("text/plain"),"clipboard"),w.play()),e.preventDefault(),v.g("send","event","app","source-paste")}function n(e){e.preventDefault()}function o(e){e.preventDefault()}function i(e){e.preventDefault(),window.__output.className=""}function r(e){e.preventDefault()}function a(e){e.preventDefault(),window.__output.className="smile"}function s(e){e.preventDefault(),window.__output.className=""}function c(e){w.setPosFraction(e.clientX/window.__percentagewrap.scrollWidth)}function u(e){y[T[e.keyCode]]&&(void 0===y[T[e.keyCode]].arg?y[T[e.keyCode]].func():y[T[e.keyCode]].func(y[T[e.keyCode]].arg)),window.__droparea.value=""}function l(e){e.preventDefault(),e.deltaY?e.deltaY>0?w.inc(!0):e.deltaY<0&&w.dec(!0):e.deltaX&&0!==e.deltaX&&0===e.deltaY&&(e.deltaX>0?w.dec(!0):e.deltaX<0&&w.inc(!0))}function d(e){e&&e.target&&e.target.result&&(w.initiateText(e.target.result,K),w.play(),v.g("send","event","app","source-file-open-success"))}function f(e){if(e.target.files.length>0){var t=e.target.files[0];"text/plain"===t.type?(x.readAsText(t),K=t.name,v.g("send","event","app","source-file-open")):v.g("send","exception",{exDescription:"source-file-open-not-plain-text",exFatal:!1})}else v.g("send","exception",{exDescription:"source-file-open-no-files",exFatal:!1})}function p(e){if(window.__output.className="playing",e.dataTransfer.files.length>0){var t=e.dataTransfer.files[0];"text/plain"===t.type?(x.readAsText(t),K=t.name,v.g("send","event","app","source-file-open-drop")):v.g("send","exception",{exDescription:"source-file-open-drop-not-plain-text",exFatal:!1})}else S.hasTextMime(e.dataTransfer.types)&&(w.initiateText(e.dataTransfer.getData("text/plain"),"drag/ drop"),w.play(),v.g("send","event","app","source-text-drop"));e.preventDefault()}function g(){window.__droparea.addEventListener("drag",n,!0),window.__droparea.addEventListener("dragenter",o,!0),window.__droparea.addEventListener("dragleave",i,!0),window.__droparea.addEventListener("dragstart",r,!0),window.__droparea.addEventListener("dragover",a,!0),window.__droparea.addEventListener("dragend",s,!0),window.__droparea.addEventListener("paste",t,!0),window.__droparea.addEventListener("drop",p,!0)}function _(){window.__btn_home.addEventListener("click",w.gotoStartOfSentence,!0),window.__btn_dec.addEventListener("click",function(){w.dec(!1)},!0),window.__btn_playpause.addEventListener("click",w.playpause,!1),window.__btn_inc.addEventListener("click",function(){w.inc(!1)},!0),window.__btn_end.addEventListener("click",w.gotoStartOfNextSentence,!0),window.__btn_paragraph.addEventListener("click",w.gotoStartOfNextParagraph,!0)}function E(){window.__input_file.addEventListener("change",f,!0),window.__btn_open.addEventListener("click",w.openFile,!0),window.__btn_theme.addEventListener("click",w.cycleTheme,!0),window.__btn_slowdown.addEventListener("click",w.slowDown,!0),window.__btn_speedup.addEventListener("click",w.speedUp,!0),window.__btn_fullscreen.addEventListener("click",w.toggleFullscreen,!0),window.__btn_info.addEventListener("click",w.toggleStatus,!0),window.__lnk_more_information.addEventListener("click",function(e){v.g("send","event","Outbound link",null,e.target.href)},!0)}function m(){window.document.body.addEventListener("wheel",l,!0),window.document.body.addEventListener("mousemove",w.mousemove,!0),window.__controls.addEventListener("mouseover",w.controlsMouseover,!0),window.__controls.addEventListener("mouseout",w.controlsMouseout,!0),window.__actionbar.addEventListener("mouseover",w.controlsMouseover,!0),window.__actionbar.addEventListener("mouseout",w.controlsMouseout,!0)}function h(){g(),_(),E(),window.__percentagewrap.addEventListener("click",c,!0),window.__rightarea.addEventListener("click",w.playpause,!0),window.document.body.addEventListener("keydown",u,!0),m()}var w=e("./actions"),S=e("../utl/browserutl"),v=e("../utl/gaga"),T={0:"SECTION_KEY_FF",9:"TAB_KEY",13:"ENTER_KEY",188:"COMMA_KEY",190:"DOT_KEY",191:"SLASH_KEY",192:"SECTION_KEY",32:"SPACE_KEY",33:"PAGEUP_KEY",34:"PAGEDOWN_KEY",35:"END_KEY",36:"HOME_KEY",37:"LEFT_KEY",38:"UP_KEY",39:"RIGHT_KEY",40:"DOWN_KEY",48:"ZERO_KEY",49:"ONE_KEY",50:"TWO_KEY",51:"THREE_KEY",52:"FOUR_KEY",53:"FIVE_KEY",54:"SIX_KEY",55:"SEVEN_KEY",56:"EIGHT_KEY",57:"NINE_KEY",65:"A_KEY",66:"B_KEY",67:"C_KEY",68:"D_KEY",69:"E_KEY",70:"F_KEY",73:"I_KEY",79:"O_KEY",81:"Q_KEY",82:"R_KEY",83:"S_KEY",84:"T_KEY",87:"W_KEY"},y={HOME_KEY:{func:w.home},END_KEY:{func:w.end},I_KEY:{func:w.toggleStatus},C_KEY:{func:w.forgetEverything},T_KEY:{func:function(){w.showTimeToGo(),v.g("send","event","app","time-to-go-show")}},SPACE_KEY:{func:w.playpause},ENTER_KEY:{func:w.playpause},LEFT_KEY:{func:w.dec},A_KEY:{func:w.dec},PAGEDOWN_KEY:{func:w.gotoStartOfNextSentence},E_KEY:{func:w.gotoStartOfNextSentence},R_KEY:{func:w.gotoStartOfNextParagraph},RIGHT_KEY:{func:w.inc},D_KEY:{func:w.inc},PAGEUP_KEY:{func:w.gotoStartOfSentence},Q_KEY:{func:w.gotoStartOfSentence},DOWN_KEY:{func:w.slowDown},S_KEY:{func:w.slowDown},UP_KEY:{func:w.speedUp},W_KEY:{func:w.speedUp},O_KEY:{func:w.openFile},B_KEY:{func:w.savePosition},F_KEY:{func:w.toggleFullscreen},ONE_KEY:{func:w.setTheme,arg:1},TWO_KEY:{func:w.setTheme,arg:2},THREE_KEY:{func:w.setTheme,arg:3},FOUR_KEY:{func:w.setTheme,arg:4},FIVE_KEY:{func:w.setTheme,arg:5},SIX_KEY:{func:w.setTheme,arg:6},SEVEN_KEY:{func:w.setTheme,arg:7},EIGHT_KEY:{func:w.setTheme,arg:8},NINE_KEY:{func:w.setTheme,arg:9},SECTION_KEY:{func:w.cycleTheme},SECTION_KEY_FF:{func:w.cycleTheme}},x=new FileReader,K="";return x.addEventListener("loadend",d),{addEventListeners:h}}),require(["./utl/formatting","./utl/paramslikker","./utl/browserutl","./utl/gaga","./ui-control/eventmap","./ui-control/actions","./ui-control/constants"],function(e,t,n,o,i,r,a){"use strict";function s(e){o.gaSetup(!e),o.g("create","UA-78467679-1","auto"),o.g("send","pageview")}function c(e,t,n){localStorage.getItem(e)&&t(localStorage.getItem(e),n)}var u=1e3,l={thoughts:"samples/thoughts.txt",1984:"samples/1984.txt",freedom:"samples/freedom.txt",intro:"samples/intro.txt",intro_nl:"samples/intro.nl.txt",laozi:"samples/laozi.txt"};i.addEventListeners(),function(){n.localStorageOK()&&(c(a.LS_KEY_SPEED,r.setSpeed),c(a.LS_KEY_TITLE,r.setDocumentTitle),c(a.LS_KEY_BUFFER,r.initiateText,r.getDocumentTitle()),c(a.LS_KEY_POSITION,r.setPos),c(a.LS_KEY_THEME,r.setTheme))}(),function(t){s(e.sanitizeBooleanesque(t.donottrack)),t.speed&&r.setSpeed(t.speed),t.theme&&r.setTheme(t.theme),t.text&&r.initiateText(decodeURIComponent(t.text),"url"),t.pos&&r.setPos(t.pos),t.loop&&e.sanitizeBooleanesque(t.loop)?r.setLooping(!0):r.setLooping(!1),t.play&&e.sanitizeBooleanesque(t.play)&&window.setTimeout(r.play,u),!t.text&&t.canned&&n.ajax(decodeURIComponent(l[t.canned]),function(e){r.initiateText(e.target.response,t.canned)},function(){o.g("send","exception",{exDescription:"could-not-load-canned-text "+t.canned,exFatal:!1})}),!t.text&&t.url&&n.ajax(decodeURIComponent(t.url),function(e){r.initiateText(e.target.response,t.url)},function(){o.g("send","exception",{exDescription:"could-not-load-text-from-url "+t.url,exFatal:!1})})}(t.getParams(window.location.search))}),define("wordywordy",function(){});