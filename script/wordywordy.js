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
* v2.0.0 - 2014-12-22
* (c) Sindre Sorhus; MIT License
*/

define("utl/formatting",[],function(){"use strict";function i(i){var s=i/e,o=Math.max(0,s/t),u=Math.max(0,o/n),a=Math.max(0,u/r),f=Math.max(0,i-Math.floor(s)*e);return s=Math.max(0,s-Math.floor(o)*t),o=Math.max(0,o-Math.floor(u)*n),u=Math.max(0,u-Math.floor(a)*r),{days:Math.floor(a),hours:Math.floor(u),minutes:Math.floor(o),seconds:Math.floor(s),milliseconds:f}}function s(e){return e<10?"0"+e:e.toString()}var e=1e3,t=60,n=60,r=24;return{formatTime:function(e,t){var n=i(e);t||(t=!1);var r=(n.hours>0?n.hours+":":"")+s(n.minutes)+":"+s(n.seconds)+(t?"."+n.milliseconds:"");return r},sanitizeNumber:function(e,t){typeof e=="string"&&(e=parseInt(e));if(typeof e!="number"||isNaN(e))e=t;return e},sanitizeBooleanesque:function(e){return["1","true","y","yes"].indexOf(e)>-1}}}),define("utl/paramslikker",[],function(){"use strict";return{getParams:function(e){var t={};if(e){var n;e.slice(1).split("&").forEach(function(e){n=e.split("="),2===n.length&&(t[n[0]]=unescape(n[1]))})}return t}}}),define("utl/browserutl",[],function(){"use strict";return{ajax:function(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(e){e.target.readyState!==4||!!e.target.status&&e.target.status!==200?n(e):t(e)},r.open("GET",e),r.responseType="text",r.send()},localStorageOK:function(){return typeof localStorage!="undefined"},hasTextMime:function(e){for(var t=0;t<e.length;t++)if("text/plain"===e[t])return!0;return!1}}}),define("chopper/chopper",["../utl/formatting"],function(e){"use strict";function H(t,n){C=t.replace(/[\-]{4,}/g,"---").replace(/[_]{4,}/g,"___").replace(/[=]{4,}/g,"===").replace(/[+]{4,}/g,"+++").replace(/[~]{4,}/g,"~~~").replace(/\.\.\./g,"…").replace(/([a-zA-Z])([\(\)\[\]\{\}\.\?!:;\-,\u2026\/|\u2010-\u2015]{1,2})([a-zA-Z])/g,"$1$2 $3").replace(/&nbsp;/g," ").replace(/\u00A0/g," ").replace(/\r\n/g,"\n").replace(/[\n]{2,}/g,"  ").replace(N," $1").split(g),k=C.length,F(e.sanitizeNumber(n,0))}function B(e){F(O+e)}function j(e){F(O-e)}function F(e){O=Math.min(k,Math.max(0,e))}function I(){return O}function q(){return k>0?100*(O/k):0}function R(v){v=e.sanitizeNumber(v,n),L=Math.min(r,Math.max(t,v)),A=(L-t)/(r-t);var m=nt(v);M=i*m,_=s*m,D=[{re:b,delay:p*m},{re:/[;:\u2026\u2013\u00B7|\u2010-\u2015]/,delay:h*m},{re:/[-,\/\uFF0C]/,delay:c*m},{re:/[\(\)\[\]\{\}]/,delay:l*m},{re:/["'\u2018\u2019\u201c\u201d]/,delay:f*m},{re:/\u00A0/,delay:d*m},{re:/[0-9=\+]/,delay:u*m},{re:/[A-Z]/,delay:a*m},{re:N,delay:o*m}],P=D.length}function U(){return L}function z(n){A=e.sanitizeNumber(n,.5),R(t+A*(r-t))}function W(){return A}function X(e){R(L+e)}function V(e){R(L-e)}function $(){var e=!1;C[O-1]&&C[O-1].match(b)&&j(1),C[O]&&C[O].match(b)&&j(1);var t=Math.max(O-m,0);for(O;!e&&O>t;O--)C[O]&&C[O].match(b)&&(e=!0,O+=2);C[O].match(w)&&B(1)}function J(e){var t=!1,n=Math.min(O+m,k);for(O;!t&&O<n;O++)C[O]&&C[O].match(e)&&(t=!0)}function K(){J(b)}function Q(){J(w)}function G(){var e=!1,t=Math.min(O+m,k);for(O;!e&&O<t;O++)C[O]&&C[O].match(b)&&(e=!0,O-=1)}function Y(){return k}function Z(){return C[O]}function et(e){for(var t=0;t<P;t++)if(D[t].re.test(e))return D[t].delay;return _}function tt(){var e=0;for(var t=0;t<k;t++)e+=it(C[t]);return k/(e/v)}function nt(e){return v/e/300}function rt(){return it(C[O])}function it(e){var t=0;if(e){t=M;for(var n=0,r=e.length;n<r;n++)t+=et(e[n])}return t}function st(){return v*(k-O)/L}var t=60,n=300,r=600,i=100,s=30,o=250,u=50,a=50,f=40,l=100,c=180,h=250,p=400,d=250,v=6e4,m=69,g=new RegExp("[ \f\n\r	 ᠎           \u2028\u2029  　]+"),y=".?!。？",b=new RegExp("["+y+"]"),w=new RegExp(" "),E="⺀-⺙|⺛-⻳|⼀-⿕|々|〇|〡-〩|〸-〺|〻|㐀-䶵|一-鿌|豈-舘|並-龎",S="ꀀ-ꀔ|ꀕ|ꀖ-ꒌ|꒐-꓆",x="ᄀ-ᇿ|〮-〯|ㄱ-ㆎ|㈀-㈞|㉠-㉾|ꥠ-ꥼ|가-힣|ힰ-ퟆ|ퟋ-ퟻ|ﾠ-ﾾ|ￂ-ￇ|ￊ-ￏ|ￒ-ￗ|ￚ-ￜ",T=E+"|"+S+"|"+x,N=new RegExp("(["+T+"])","g"),C=[],k=0,L=n,A=(n-t)/(r-t),O=0,M=i*nt(L),_=s*nt(L),D=[],P=0;return{init:H,getSpeed:U,setSpeed:R,setSpeedFraction:z,getSpeedFraction:W,incSpeed:X,decSpeed:V,getCurrentWord:Z,getDisplayTime:rt,getLength:Y,getPercentage:q,getEstimatedTimeToGo:st,getAverageSpeed:tt,getPosition:I,setPosition:F,incPosition:B,decPosition:j,gotoEndOfSentence:G,gotoStartOfSentence:$,gotoStartOfNextSentence:K,gotoStartOfNextParagraph:Q}}),define("utl/stopwatch",[],function(){"use strict";function e(){this.reset()}return e.prototype.reset=function(){this.state="paused",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},e.prototype.start=function(){this.state="running",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},e.prototype.resume=function(){this.state="running";var e=Date.now()-this.pauseStartTime;this.cumulativePauses+=e},e.prototype.pause=function(){this.state!=="paused"&&(this.state="paused",this.pauseStartTime=Date.now())},e.prototype.getTimeElapsed=function(){return this.state==="running"?Date.now()-this.startTime-this.cumulativePauses:this.pauseStartTime-this.startTime-this.cumulativePauses},{Stopwatch:e}}),define("ui-control/constants",[],function(){"use strict";return{LS_KEY_BUFFER:"buffer",LS_KEY_TITLE:"title",LS_KEY_POSITION:"position",LS_KEY_SPEED:"speed",LS_KEY_THEME:"theme"}}),define("ui-control/themeswitcher",["../utl/formatting"],function(e){"use strict";function r(){t++,t>=n.length&&(t=0),i(t)}function i(r){var i=Math.max(Math.min(e.sanitizeNumber(r,1),n.length-1),0);t=i,window.customtheme.href=n[i].href}function s(){return n[t]}var t=1,n=[{nr:0,title:"Zany",href:"style/themes/zany.css"},{nr:1,title:"Sepia",href:"style/themes/sepia.css"},{nr:2,title:"Day",href:"style/themes/day.css"},{nr:3,title:"Night",href:"style/themes/night.css"},{nr:4,title:"Low contrast",href:"style/themes/low-contrast.css"},{nr:5,title:"High contrast",href:"style/themes/high-contrast.css"},{nr:6,title:"Dyslexia - sepia",href:"style/themes/dyslexia-sepia.css"},{nr:7,title:"Dyslexia - day",href:"style/themes/dyslexia-day.css"},{nr:8,title:"Dyslexia - night",href:"style/themes/dyslexia-night.css"},{nr:9,title:"Dyslexia - low contrast",href:"style/themes/dyslexia-low-contrast.css"},{nr:10,title:"Dyslexia - high contrast",href:"style/themes/dyslexia-high-contrast.css"},{nr:11,title:"Low contrast fat font",href:"style/themes/low-contrast-fat-font.css"},{nr:12,title:"Sepia fat font",href:"style/themes/sepia-fat-font.css"},{nr:13,title:"220",href:"style/themes/220.css"},{nr:14,title:"057",href:"style/themes/057.css"},{nr:15,title:"074",href:"style/themes/074.css"},{nr:16,title:"HV",href:"style/themes/hv.css"},{nr:17,title:"liberal",href:"style/themes/liberal.css"},{nr:18,title:"progressive",href:"style/themes/progressive.css"},{nr:19,title:"background",href:"style/themes/background.css"}];return{cycleTheme:r,setTheme:i,getCurrentTheme:s}}),function(){"use strict";var e=typeof module!="undefined"&&module.exports,t=typeof Element!="undefined"&&"ALLOW_KEYBOARD_INPUT"in Element,n=function(){var e,t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,i=n.length,s={};for(;r<i;r++){e=n[r];if(e&&e[1]in document){for(r=0,t=e.length;r<t;r++)s[n[0][r]]=e[r];return s}}return!1}(),r={request:function(e){var r=n.requestFullscreen;e=e||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[r]():e[r](t&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[n.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},raw:n};if(!n){e?module.exports=!1:window.screenfull=!1;return}Object.defineProperties(r,{isFullscreen:{get:function(){return!!document[n.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[n.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[n.fullscreenEnabled]}}}),e?module.exports=r:window.screenfull=r}(),define("ui-control/../../lib/screenfull",function(){}),define("ui-control/actions",["../chopper/chopper","../utl/formatting","../utl/stopwatch","../utl/browserutl","../ui-control/constants","../ui-control/themeswitcher","../../lib/screenfull"],function(e,t,n,r,i,s){"use strict";function S(){a&&window.clearTimeout(a),p===!0&&(window.__output.className="playing"),o&&(e.getPosition()<e.getLength()?(a=window.setTimeout(S,e.getDisplayTime()),x(e.getCurrentWord(),!0),e.incPosition(1)):p===!0?(e.setPosition(0),window.__output.className="reload",a=window.setTimeout(S,1e3)):(window.__output.textContent="",window.__output.className="smile",k()))}function x(t,n){undefined!==t&&(window.__output.textContent=t,window.__percentage.setAttribute("style","width: "+e.getPercentage()+"%;"),h&&T(),n&&u++)}function T(){var n=E.getTimeElapsed(),r=n/b,i=r>0?u/r:0,s=e.getEstimatedTimeToGo(),o=n+s;window.__documentTitle.textContent=d,window.__selectedSpeed.textContent=e.getSpeed().toFixed(0),window.__actualSpeed.textContent=i.toFixed(0),window.__position.textContent=e.getPosition(),window.__positionInPercent.textContent=e.getPercentage().toFixed(1),window.__wordsPlayed.textContent=u,window.__wordsTotal.textContent=e.getLength(),window.__timeElapsed.textContent=t.formatTime(n),window.__timeToGo.textContent=t.formatTime(s),window.__timeTotal.textContent=t.formatTime(o)}function N(){h=!h,h?(window.__status.style.display="inline",T()):window.__status.style.display="none"}function C(){E.resume(),o=!0,window.__output.className="playing",window.__btn_playpause.className=y,document.title=m+" "+d+" - "+v,S()}function k(){E.pause(),o=!1,document.title=d+" - "+v,window.__btn_playpause.className=g,r.localStorageOK()&&localStorage.setItem("position",e.getPosition())}function L(){l&&window.clearTimeout(l),window.__controls.className="",window.__actionbar.className="",l=window.setTimeout(function(){window.__controls.className="fade-away",window.__actionbar.className="fade-away"},w)}function A(e){f&&window.clearTimeout(f),window.__toast.style.display="block",window.__toast.className="",window.__toast.innerHTML=e,f=window.setTimeout(function(){window.__toast.className="fade-away"},w)}function O(e){d=e,r.localStorageOK()&&localStorage.setItem(i.LS_KEY_TITLE,e)}function M(t){t&&k(),x(e.getCurrentWord(),!1),A(e.getPercentage().toFixed(1)+"%")}function _(e){T(),A(e.toFixed(0)+" wpm"),r.localStorageOK()&&localStorage.setItem(i.LS_KEY_SPEED,e)}function D(){A("<span class='icon-stopwatch'></span> -"+t.formatTime(e.getEstimatedTimeToGo()))}function P(){s.cycleTheme(),A(s.getCurrentTheme().title),r.localStorageOK()&&localStorage.setItem(i.LS_KEY_THEME,s.getCurrentTheme().nr)}function H(e){s.setTheme(e),A(s.getCurrentTheme().title),r.localStorageOK()&&localStorage.setItem(i.LS_KEY_THEME,s.getCurrentTheme().nr)}function B(){M(!0),window.__input_file.click()}function j(t){e.setPosition(t),M(!1)}function F(t){j(Math.floor(t*e.getLength()))}function I(){j(0)}function q(){e.decPosition(1),M(!0)}function R(){o=!o,o?C():k()}function U(){e.incPosition(1),M(!0)}function z(){j(e.getLength())}function W(){e.incSpeed(5),_(e.getSpeed())}function X(){e.decSpeed(5),_(e.getSpeed())}function V(t){e.setSpeed(t),_(e.getSpeed())}function $(t){e.setSpeedFraction(t),_(e.getSpeed())}function J(){e.gotoStartOfNextSentence(),M(!1)}function K(){e.gotoStartOfNextParagraph(),M(!1)}function Q(){e.gotoStartOfSentence(),M(!0)}function G(){r.localStorageOK()&&localStorage.setItem(i.LS_KEY_POSITION,e.getPosition()),A("position saved")}function Y(t,n){u=0,window.__output.className="",r.localStorageOK()&&localStorage.setItem(i.LS_KEY_BUFFER,t),e.init(t),window.__avgSpeed.textContent=e.getAverageSpeed().toFixed(1),E.reset(),x(e.getCurrentWord(),!1),D(),O(n)}function Z(e){p=e}function et(){Y("",""),r.localStorageOK()&&(localStorage.removeItem(i.LS_KEY_BUFFER),localStorage.removeItem(i.LS_KEY_TITLE),localStorage.removeItem(i.LS_KEY_POSITION),localStorage.removeItem(i.LS_KEY_SPEED),localStorage.removeItem(i.LS_KEY_THEME)),I(),A("Forgot everything")}function tt(){window.screenfull.enabled&&window.screenfull.toggle()}function nt(){c||L()}function rt(){l&&window.clearTimeout(l),c=!0,window.__controls.className="",window.__actionbar.className=""}function it(){c=!1}function st(){return d}var o=!1,u=0,a,f,l,c=!1,h=!1,p=!1,d="",v="WordyWordy",m="▷",g="icon-play3",y="icon-pause2",b=6e4,w=2200,E=new n.Stopwatch;return{toggleStatus:N,play:C,pause:k,toast:A,showTimeToGo:D,setTheme:H,cycleTheme:P,openFile:B,setPos:j,setPosFraction:F,home:I,end:z,dec:q,playpause:R,inc:U,speedUp:W,slowDown:X,setSpeed:V,setSpeedFraction:$,gotoStartOfNextSentence:J,gotoStartOfNextParagraph:K,gotoStartOfSentence:Q,savePosition:G,initiateText:Y,setLooping:Z,forgetEverything:et,toggleFullscreen:tt,mousemove:nt,controlsMouseover:rt,controlsMouseout:it,getDocumentTitle:st,setDocumentTitle:O}}),define("ui-control/eventmap",["./actions","../utl/browserutl"],function(e,t){"use strict";function o(t){t&&t.clipboardData&&(e.initiateText(t.clipboardData.getData("text/plain"),"clipboard"),e.play()),t.preventDefault()}function u(e){e.preventDefault()}function a(e){e.preventDefault()}function f(e){e.preventDefault(),window.__output.className=""}function l(e){e.preventDefault()}function c(e){e.preventDefault(),window.__output.className="smile"}function h(e){e.preventDefault(),window.__output.className=""}function p(t){var n=t.clientX/window.__percentagewrap.scrollWidth;e.setPosFraction(n)}function d(e){r[n[e.keyCode]]&&(undefined!==r[n[e.keyCode]].arg?r[n[e.keyCode]].func(r[n[e.keyCode]].arg):r[n[e.keyCode]].func()),window.__droparea.value=""}function v(t){t.preventDefault(),t.deltaY?t.deltaY>0?e.inc():t.deltaY<0&&e.dec():t.deltaX&&t.deltaX!==0&&t.deltaY===0&&(t.deltaX>0?e.dec():t.deltaX<0&&e.inc())}function m(t){t&&t.target&&t.target.result&&(e.initiateText(t.target.result,s),e.play())}function g(e){if(e.target.files.length>0){var t=e.target.files[0];t.type==="text/plain"&&(i.readAsText(t),s=t.name)}}function y(n){window.__output.className="playing";if(n.dataTransfer.files.length>0){var r=n.dataTransfer.files[0];r.type==="text/plain"&&(i.readAsText(r),s=r.name)}else t.hasTextMime(n.dataTransfer.types)&&(e.initiateText(n.dataTransfer.getData("text/plain"),"drag/ drop"),e.play());n.preventDefault()}function b(){window.__droparea.addEventListener("drag",u,!0),window.__droparea.addEventListener("dragenter",a,!0),window.__droparea.addEventListener("dragleave",f,!0),window.__droparea.addEventListener("dragstart",l,!0),window.__droparea.addEventListener("dragover",c,!0),window.__droparea.addEventListener("dragend",h,!0),window.__droparea.addEventListener("paste",o,!0),window.__droparea.addEventListener("drop",y,!0)}function w(){window.__btn_home.addEventListener("click",e.gotoStartOfSentence,!0),window.__btn_dec.addEventListener("click",e.dec,!0),window.__btn_playpause.addEventListener("click",e.playpause,!1),window.__btn_inc.addEventListener("click",e.inc,!0),window.__btn_end.addEventListener("click",e.gotoStartOfNextSentence,!0),window.__btn_paragraph.addEventListener("click",e.gotoStartOfNextParagraph,!0)}function E(){window.__input_file.addEventListener("change",g,!0),window.__btn_open.addEventListener("click",e.openFile,!0),window.__btn_theme.addEventListener("click",e.cycleTheme,!0),window.__btn_slowdown.addEventListener("click",e.slowDown,!0),window.__btn_speedup.addEventListener("click",e.speedUp,!0),window.__btn_fullscreen.addEventListener("click",e.toggleFullscreen,!0),window.__btn_info.addEventListener("click",e.toggleStatus,!0)}function S(){window.document.body.addEventListener("wheel",v,!0),window.document.body.addEventListener("mousemove",e.mousemove,!0),window.__controls.addEventListener("mouseover",e.controlsMouseover,!0),window.__controls.addEventListener("mouseout",e.controlsMouseout,!0),window.__actionbar.addEventListener("mouseover",e.controlsMouseover,!0),window.__actionbar.addEventListener("mouseout",e.controlsMouseout,!0)}function x(){b(),w(),E(),window.__percentagewrap.addEventListener("click",p,!0),window.__rightarea.addEventListener("click",e.playpause,!0),window.document.body.addEventListener("keydown",d,!0),S()}var n={0:"SECTION_KEY_FF",9:"TAB_KEY",13:"ENTER_KEY",188:"COMMA_KEY",190:"DOT_KEY",191:"SLASH_KEY",192:"SECTION_KEY",32:"SPACE_KEY",33:"PAGEUP_KEY",34:"PAGEDOWN_KEY",35:"END_KEY",36:"HOME_KEY",37:"LEFT_KEY",38:"UP_KEY",39:"RIGHT_KEY",40:"DOWN_KEY",48:"ZERO_KEY",49:"ONE_KEY",50:"TWO_KEY",51:"THREE_KEY",52:"FOUR_KEY",53:"FIVE_KEY",54:"SIX_KEY",55:"SEVEN_KEY",56:"EIGHT_KEY",57:"NINE_KEY",65:"A_KEY",66:"B_KEY",67:"C_KEY",68:"D_KEY",69:"E_KEY",70:"F_KEY",73:"I_KEY",79:"O_KEY",81:"Q_KEY",82:"R_KEY",83:"S_KEY",84:"T_KEY",87:"W_KEY"},r={HOME_KEY:{func:e.home},END_KEY:{func:e.end},I_KEY:{func:e.toggleStatus},C_KEY:{func:e.forgetEverything},T_KEY:{func:e.showTimeToGo},SPACE_KEY:{func:e.playpause},ENTER_KEY:{func:e.playpause},LEFT_KEY:{func:e.dec},A_KEY:{func:e.dec},PAGEDOWN_KEY:{func:e.gotoStartOfNextSentence},E_KEY:{func:e.gotoStartOfNextSentence},R_KEY:{func:e.gotoStartOfNextParagraph},RIGHT_KEY:{func:e.inc},D_KEY:{func:e.inc},PAGEUP_KEY:{func:e.gotoStartOfSentence},Q_KEY:{func:e.gotoStartOfSentence},DOWN_KEY:{func:e.slowDown},S_KEY:{func:e.slowDown},UP_KEY:{func:e.speedUp},W_KEY:{func:e.speedUp},O_KEY:{func:e.openFile},B_KEY:{func:e.savePosition},F_KEY:{func:e.toggleFullscreen},ONE_KEY:{func:e.setTheme,arg:1},TWO_KEY:{func:e.setTheme,arg:2},THREE_KEY:{func:e.setTheme,arg:3},FOUR_KEY:{func:e.setTheme,arg:4},FIVE_KEY:{func:e.setTheme,arg:5},SIX_KEY:{func:e.setTheme,arg:6},SEVEN_KEY:{func:e.setTheme,arg:7},EIGHT_KEY:{func:e.setTheme,arg:8},NINE_KEY:{func:e.setTheme,arg:9},ZERO_KEY:{func:e.setTheme,arg:10},SECTION_KEY:{func:e.cycleTheme},SECTION_KEY_FF:{func:e.cycleTheme}},i=new FileReader,s="";return i.addEventListener("loadend",m),{addEventListeners:x}}),require(["utl/formatting","utl/paramslikker","utl/browserutl","ui-control/eventmap","ui-control/actions","ui-control/constants"],function(e,t,n,r,i,s){"use strict";function a(){u.speed&&i.setSpeed(u.speed),u.theme&&i.setTheme(u.theme),u.text&&i.initiateText(decodeURIComponent(u.text),"url"),u.pos&&i.setPos(u.pos),u.loop&&e.sanitizeBooleanesque(u.loop)?i.setLooping(!0):i.setLooping(!1),u.play&&e.sanitizeBooleanesque(u.play)&&window.setTimeout(i.play,o);var t={thoughts:"samples/thoughts.txt",1984:"samples/1984.txt",freedom:"samples/freedom.txt",intro:"samples/intro.txt",intro_nl:"samples/intro.nl.txt",laozi:"samples/laozi.txt"};!u.text&&u.canned&&n.ajax(decodeURIComponent(t[u.canned]),function(e){i.initiateText(e.target.response,u.canned)},function(){}),!u.text&&u.url&&n.ajax(decodeURIComponent(u.url),function(e){i.initiateText(e.target.response,u.url)},function(){})}function f(e,t,n){localStorage.getItem(e)&&t(localStorage.getItem(e),n)}function l(){n.localStorageOK()&&(f(s.LS_KEY_SPEED,i.setSpeed),f(s.LS_KEY_TITLE,i.setDocumentTitle),f(s.LS_KEY_BUFFER,i.initiateText,i.getDocumentTitle()),f(s.LS_KEY_POSITION,i.setPos),f(s.LS_KEY_THEME,i.setTheme))}var o=1e3,u=t.getParams(window.location.search);r.addEventListeners(),l(),a()}),define("wordywordy",function(){});