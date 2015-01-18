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

define("utl/formatting",[],function(){function i(i){var s=i/e,o=Math.max(0,s/t),u=Math.max(0,o/n),a=Math.max(0,u/r),f=Math.max(0,i-Math.floor(s)*e);return s=Math.max(0,s-Math.floor(o)*t),o=Math.max(0,o-Math.floor(u)*n),u=Math.max(0,u-Math.floor(a)*r),{days:Math.floor(a),hours:Math.floor(u),minutes:Math.floor(o),seconds:Math.floor(s),milliseconds:f}}function s(e){return e<10?"0"+e:e.toString()}var e=1e3,t=60,n=60,r=24;return{formatTime:function(e,t){var n=i(e);t||(t=!1);var r=(n.hours>0?n.hours+":":"")+s(n.minutes)+":"+s(n.seconds)+(t?"."+n.milliseconds:"");return r},sanitizeNumber:function(e,t){typeof e=="string"&&(e=parseInt(e));if(typeof e!="number"||isNaN(e))e=t;return e},sanitizeBooleanesque:function(e){return["1","true","y","yes"].indexOf(e)>-1}}}),define("utl/paramslikker",[],function(){return{getParams:function(e){var t={};if(e){var n;e.slice(1).split("&").forEach(function(e){n=e.split("="),2===n.length&&(t[n[0]]=unescape(n[1]))})}return t}}}),define("utl/browserutl",[],function(){return{ajax:function(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(e){e.target.readyState!==4||!!e.target.status&&e.target.status!==200?n(e):t(e)},r.open("GET",e),r.responseType="text",r.send()},localStorageOK:function(){return typeof localStorage!="undefined"}}}),define("chopper/chopper",["../utl/formatting"],function(e){function P(t,n){N=t.replace(/[\-]{4,}/g,"---").replace(/[_]{4,}/g,"___").replace(/[=]{4,}/g,"===").replace(/[+]{4,}/g,"+++").replace(/[~]{4,}/g,"~~~").replace(/\.\.\./g,"…").replace(/([a-zA-Z])([\(\)\[\]\{\}\.\?\!:;\-,…\/|\u2010-\u2015]{1,2})([a-zA-Z])/g,"$1$2 $3").replace(/&nbsp;/g," ").replace(/\u00A0/g," ").replace(/\r\n/g,"\n").replace(/[\n]{2,}/g,"  ").replace(T," $1").split(g),C=N.length,j(e.sanitizeNumber(n,0))}function H(e){j(A+e)}function B(e){j(A-e)}function j(e){A=Math.min(C,Math.max(0,e))}function F(){return A}function I(){return C>0?100*(A/C):0}function q(v){v=e.sanitizeNumber(v,n),k=Math.min(r,Math.max(t,v)),L=(k-t)/(r-t);var m=Z(v);O=i*m,M=s*m,_=[{re:b,delay:p*m},{re:/[;:…–\u00B7|\u2010-\u2015]/,delay:h*m},{re:/[-,\/\uFF0C]/,delay:c*m},{re:/[\(\)\[\]\{\}]/,delay:l*m},{re:/["'‘’“”]/,delay:f*m},{re:/\u00A0/,delay:d*m},{re:/[0-9=\+]/,delay:u*m},{re:/[A-Z]/,delay:a*m},{re:T,delay:o*m}],D=_.length}function R(){return k}function U(n){L=e.sanitizeNumber(n,.5),q(t+L*(r-t))}function z(){return L}function W(e){q(k+e)}function X(e){q(k-e)}function V(){var e=!1;N[A-1]&&N[A-1].match(b)&&A--,N[A]&&N[A].match(b)&&A--;var t=Math.max(A-m,0);for(A;!e&&A>t;A--)N[A]&&N[A].match(b)&&(e=!0,A+=2)}function $(){var e=!1,t=Math.min(A+m,C);for(A;!e&&A<t;A++)N[A]&&N[A].match(b)&&(e=!0)}function J(){var e=!1,t=Math.min(A+m,C);for(A;!e&&A<t;A++)N[A]&&N[A].match(b)&&(e=!0,A-=1)}function K(){return C}function Q(){return N[A]}function G(e){for(var t=0;t<D;t++)if(_[t].re.test(e))return _[t].delay;return M}function Y(){var e=0;for(var t=0;t<C;t++)e+=tt(N[t]);return C/(e/v)}function Z(e){return v/e/300}function et(){return tt(N[A])}function tt(e){var t=0;if(e){t=O;for(var n=0,r=e.length;n<r;n++)t+=G(e[n])}return t}function nt(){return v*(C-A)/k}var t=60,n=300,r=600,i=100,s=30,o=250,u=50,a=50,f=40,l=100,c=180,h=250,p=400,d=250,v=6e4,m=42,g=new RegExp("[ \f\n\r	 ᠎           \u2028\u2029  　]+"),y=".?!。？",b=new RegExp("["+y+"]"),w="⺀-⺙|⺛-⻳|⼀-⿕|々|〇|〡-〩|〸-〺|〻|㐀-䶵|一-鿌|豈-舘|並-龎",E="ꀀ-ꀔ|ꀕ|ꀖ-ꒌ|꒐-꓆",S="ᄀ-ᇿ|〮-〯|ㄱ-ㆎ|㈀-㈞|㉠-㉾|ꥠ-ꥼ|가-힣|ힰ-ퟆ|ퟋ-ퟻ|ﾠ-ﾾ|ￂ-ￇ|ￊ-ￏ|ￒ-ￗ|ￚ-ￜ",x=w+"|"+E+"|"+S,T=new RegExp("(["+x+"])","g"),N=[],C=0,k=n,L=(n-t)/(r-t),A=0,O=i*Z(k),M=s*Z(k),_=[],D=0;return{init:P,getSpeed:R,setSpeed:q,setSpeedFraction:U,getSpeedFraction:z,incSpeed:W,decSpeed:X,getCurrentWord:Q,getDisplayTime:et,getLength:K,getPercentage:I,getEstimatedTimeToGo:nt,getAverageSpeed:Y,getPosition:F,setPosition:j,incPosition:H,decPosition:B,gotoEndOfSentence:J,gotoStartOfSentence:V,gotoStartOfNextSentence:$}}),define("utl/stopwatch",[],function(){function e(){this.reset=function(){this.state="paused",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},this.reset()}return e.prototype.start=function(){this.state="running",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},e.prototype.resume=function(){this.state="running";var e=Date.now()-this.pauseStartTime;this.cumulativePauses+=e},e.prototype.pause=function(){this.state!=="paused"&&(this.state="paused",this.pauseStartTime=Date.now())},e.prototype.getTimeElapsed=function(){return this.state==="running"?Date.now()-this.startTime-this.cumulativePauses:this.pauseStartTime-this.startTime-this.cumulativePauses},{Stopwatch:e}}),define("ui-control/actions",["../chopper/chopper","../utl/formatting","../utl/stopwatch","../utl/browserutl"],function(e,t,n,r){function k(t){s=0,e.init(t,0),window.__avgSpeed.textContent=e.getAverageSpeed().toFixed(1),I(),T.start(),_()}function L(){o&&window.clearTimeout(o),c===!0&&(window.__output.className="playing"),i&&(e.getPosition()<e.getLength()?(o=window.setTimeout(L,e.getDisplayTime()),A(e.getCurrentWord(),!0),e.incPosition(1)):c===!0?(e.setPosition(0),window.__output.className="reload",o=window.setTimeout(L,1e3)):(window.__output.textContent="",window.__output.className="smile",D()))}function A(t,n){undefined!==t&&(window.__output.textContent=t,window.__percentage.setAttribute("style","width: "+e.getPercentage()+"%;"),l&&O(),n&&s++)}function O(){var n=T.getTimeElapsed(),r=n/g,i=r>0?s/r:0,o=e.getEstimatedTimeToGo(),u=n+o;window.__documentTitle.textContent=h,window.__selectedSpeed.textContent=e.getSpeed().toFixed(0),window.__actualSpeed.textContent=i.toFixed(0),window.__position.textContent=e.getPosition(),window.__positionInPercent.textContent=e.getPercentage().toFixed(1),window.__wordsPlayed.textContent=s,window.__wordsTotal.textContent=e.getLength(),window.__timeElapsed.textContent=t.formatTime(n),window.__timeToGo.textContent=t.formatTime(o),window.__timeTotal.textContent=t.formatTime(u)}function M(){l=!l,l?(window.__status.style.display="inline",O()):window.__status.style.display="none"}function _(){T.resume(),i=!0,window.__output.className="playing",window.__btn_playpause.className=m,document.title=d+" "+h+" - "+p,L()}function D(){T.pause(),i=!1,document.title=h+" - "+p,window.__btn_playpause.className=v,r.localStorageOK()&&localStorage.setItem("position",e.getPosition())}function P(){a&&window.clearTimeout(a),window.__controls.className="",window.__actionbar.className="",a=window.setTimeout(function(){window.__controls.className="fade-away",window.__actionbar.className="fade-away"},y)}function H(e){u&&window.clearTimeout(u),window.__toast.style.display="block",window.__toast.className="",window.__toast.innerHTML=e,u=window.setTimeout(function(){window.__toast.className="fade-away"},y)}function B(e){h=e,r.localStorageOK()&&localStorage.setItem(w,e)}function j(t){t&&D(),A(e.getCurrentWord(),!1),H(e.getPercentage().toFixed(1)+"%")}function F(e){O(),H(e.toFixed(0)+" wpm"),r.localStorageOK()&&localStorage.setItem(S,e)}function I(){H("<span class='icon-stopwatch'></span> -"+t.formatTime(e.getEstimatedTimeToGo()))}function q(){N++,N>=C.length&&(N=0),R(N)}function R(e){var n=Math.max(Math.min(t.sanitizeNumber(e,1),C.length-1),0);N=n,window.customtheme.href=C[n].href,H(C[n].title),r.localStorageOK()&&localStorage.setItem(x,n)}function U(){j(!0),window.__input_file.click()}function z(t){e.setPosition(t),j(!0)}function W(t){z(Math.floor(t*e.getLength()))}function X(){z(0)}function V(){e.decPosition(1),j(!0)}function $(){i=!i,i?_():D()}function J(){e.incPosition(1),j(!0)}function K(){z(e.getLength())}function Q(){e.incSpeed(5),F(e.getSpeed())}function G(){e.decSpeed(5),F(e.getSpeed())}function Y(t){e.setSpeed(t),F(e.getSpeed())}function Z(t){e.setSpeedFraction(t),F(e.getSpeed())}function et(){e.gotoStartOfNextSentence(),j(!0)}function tt(){e.gotoStartOfSentence(),j(!0)}function nt(){r.localStorageOK()&&localStorage.setItem(E,e.getPosition()),H("position saved")}function rt(t,n){window.__output.className="",r.localStorageOK()&&localStorage.setItem(b,t),e.init(t),A(e.getCurrentWord()),I(),B(n)}function it(e){c=e}function st(){k(""),r.localStorageOK()&&(localStorage.removeItem(b),localStorage.removeItem(w),localStorage.removeItem(E),localStorage.removeItem(S),localStorage.removeItem(x)),X(),H("Forgot everything")}function ot(){f||P()}function ut(){a&&window.clearTimeout(a),f=!0,window.__controls.className="",window.__actionbar.className=""}function at(){f=!1}var i=!1,s=0,o,u,a,f=!1,l=!1,c=!1,h="",p="WordyWordy",d="▷",v="icon-play3",m="icon-pause2",g=6e4,y=2200,b="buffer",w="title",E="position",S="speed",x="theme",T=new n.Stopwatch,N=1,C=[{title:"Zany",href:"style/themes/zany.css"},{title:"Sepia",href:"style/themes/sepia.css"},{title:"Day",href:"style/themes/day.css"},{title:"Night",href:"style/themes/night.css"},{title:"Low contrast",href:"style/themes/low-contrast.css"},{title:"High contrast",href:"style/themes/high-contrast.css"},{title:"Dyslexia - sepia",href:"style/themes/dyslexia-sepia.css"},{title:"Dyslexia - day",href:"style/themes/dyslexia-day.css"},{title:"Dyslexia - night",href:"style/themes/dyslexia-night.css"},{title:"Dyslexia - low contrast",href:"style/themes/dyslexia-low-contrast.css"},{title:"Dyslexia - high contrast",href:"style/themes/dyslexia-high-contrast.css"},{title:"Low contrast fat font",href:"style/themes/low-contrast-fat-font.css"},{title:"Sepia fat font",href:"style/themes/sepia-fat-font.css"},{title:"220",href:"style/themes/220.css"},{title:"057",href:"style/themes/057.css"},{title:"074",href:"style/themes/074.css"},{title:"HV",href:"style/themes/hv.css"},{title:"liberal",href:"style/themes/liberal.css"},{title:"progressive",href:"style/themes/progressive.css"}];return{playString:k,toggleStatus:M,play:_,pause:D,toast:H,setDocumentTitle:B,updateTimeToGo:I,setTheme:R,cycleTheme:q,openFile:U,setPos:z,setPosFraction:W,home:X,end:K,dec:V,playpause:$,inc:J,speedUp:Q,slowDown:G,setSpeed:Y,setSpeedFraction:Z,gotoStartOfNextSentence:et,gotoStartOfSentence:tt,savePosition:nt,initiateText:rt,setLooping:it,forgetEverything:st,mousemove:ot,controlsMouseover:ut,controlsMouseout:at}}),define("ui-control/eventmap",["./actions"],function(e){function s(t){t&&t.clipboardData&&e.initiateText(t.clipboardData.getData("text/plain"),"clipboard"),t.preventDefault()}function o(e){e.preventDefault()}function u(e){e.preventDefault()}function a(e){e.preventDefault(),window.__output.className=""}function f(e){e.preventDefault()}function l(e){e.preventDefault(),window.__output.className="openmouth"}function c(e){e.preventDefault(),window.__output.className=""}function h(t){var n=t.clientX/window.__percentagewrap.scrollWidth;e.setPosFraction(n)}function p(e){n[t[e.keyCode]]&&(undefined!==n[t[e.keyCode]].arg?n[t[e.keyCode]].func(n[t[e.keyCode]].arg):n[t[e.keyCode]].func()),window.__droparea.value=""}function d(t){t.preventDefault(),t.deltaY?t.deltaY>0?e.inc():t.deltaY<0&&e.dec():t.deltaX&&t.deltaX!==0&&t.deltaY===0&&(t.deltaX>0?e.dec():t.deltaX<0&&e.inc())}function v(t){t&&t.target&&t.target.result&&e.initiateText(t.target.result,i)}function m(e){if(e.target.files.length>0){var t=e.target.files[0];t.type==="text/plain"&&(r.readAsText(t),i=t.name)}}function g(t){window.__output.className="playing";if(t.dataTransfer.files.length>0){var n=t.dataTransfer.files[0];n.type==="text/plain"&&(r.readAsText(n),i=n.name)}else y(t.dataTransfer.types)&&e.initiateText(t.dataTransfer.getData("text/plain"),"drag/ drop");t.preventDefault()}function y(e){for(var t=0;t<e.length;t++)if("text/plain"===e[t])return!0;return!1}function b(){window.__droparea.addEventListener("drag",o,!0),window.__droparea.addEventListener("dragenter",u,!0),window.__droparea.addEventListener("dragleave",a,!0),window.__droparea.addEventListener("dragstart",f,!0),window.__droparea.addEventListener("dragover",l,!0),window.__droparea.addEventListener("dragend",c,!0),window.__droparea.addEventListener("paste",s,!0),window.__droparea.addEventListener("drop",g,!0),window.__percentagewrap.addEventListener("click",h,!0),window.__uparea.addEventListener("click",e.speedUp,!0),window.__downarea.addEventListener("click",e.slowDown,!0),window.__leftarea.addEventListener("click",e.dec,!0),window.__rightarea.addEventListener("click",e.playpause,!0),window.__input_file.addEventListener("change",m,!0),window.__btn_open.addEventListener("click",e.openFile,!0),window.__btn_theme.addEventListener("click",e.cycleTheme,!0),window.__btn_home.addEventListener("click",e.home,!0),window.__btn_dec.addEventListener("click",e.dec,!0),window.__btn_playpause.addEventListener("click",e.playpause,!1),window.__btn_inc.addEventListener("click",e.inc,!0),window.__btn_end.addEventListener("click",e.end,!0),window.__btn_slowdown.addEventListener("click",e.slowDown,!0),window.__btn_speedup.addEventListener("click",e.speedUp,!0),window.__btn_info.addEventListener("click",e.toggleStatus,!0),window.document.body.addEventListener("keydown",p,!0),window.document.body.addEventListener("wheel",d,!0),window.document.body.addEventListener("mousemove",e.mousemove,!0),window.__controls.addEventListener("mouseover",e.controlsMouseover,!0),window.__controls.addEventListener("mouseout",e.controlsMouseout,!0),window.__actionbar.addEventListener("mouseover",e.controlsMouseover,!0),window.__actionbar.addEventListener("mouseout",e.controlsMouseout,!0)}var t={0:"SECTION_KEY_FF",13:"ENTER_KEY",188:"COMMA_KEY",190:"DOT_KEY",191:"SLASH_KEY",192:"SECTION_KEY",32:"SPACE_KEY",33:"PAGEUP_KEY",34:"PAGEDOWN_KEY",35:"END_KEY",36:"HOME_KEY",37:"LEFT_KEY",38:"UP_KEY",39:"RIGHT_KEY",40:"DOWN_KEY",48:"ZERO_KEY",49:"ONE_KEY",50:"TWO_KEY",51:"THREE_KEY",52:"FOUR_KEY",53:"FIVE_KEY",54:"SIX_KEY",55:"SEVEN_KEY",56:"EIGHT_KEY",57:"NINE_KEY",65:"A_KEY",66:"B_KEY",67:"C_KEY",68:"D_KEY",69:"E_KEY",79:"O_KEY",81:"Q_KEY",83:"S_KEY",84:"T_KEY",87:"W_KEY"},n={HOME_KEY:{func:e.home},END_KEY:{func:e.end},DOT_KEY:{func:e.toggleStatus},COMMA_KEY:{func:e.toggleStatus},C_KEY:{func:e.forgetEverything},T_KEY:{func:e.updateTimeToGo},SPACE_KEY:{func:e.playpause},ENTER_KEY:{func:e.playpause},LEFT_KEY:{func:e.dec},A_KEY:{func:e.dec},PAGEDOWN_KEY:{func:e.gotoStartOfNextSentence},E_KEY:{func:e.gotoStartOfNextSentence},RIGHT_KEY:{func:e.inc},D_KEY:{func:e.inc},PAGEUP_KEY:{func:e.gotoStartOfSentence},Q_KEY:{func:e.gotoStartOfSentence},DOWN_KEY:{func:e.slowDown},S_KEY:{func:e.slowDown},UP_KEY:{func:e.speedUp},W_KEY:{func:e.speedUp},O_KEY:{func:e.openFile},B_KEY:{func:e.savePosition},ONE_KEY:{func:e.setTheme,arg:1},TWO_KEY:{func:e.setTheme,arg:2},THREE_KEY:{func:e.setTheme,arg:3},FOUR_KEY:{func:e.setTheme,arg:4},FIVE_KEY:{func:e.setTheme,arg:5},SIX_KEY:{func:e.setTheme,arg:7},SEVEN_KEY:{func:e.setTheme,arg:8},EIGHT_KEY:{func:e.setTheme,arg:9},NINE_KEY:{func:e.setTheme,arg:10},ZERO_KEY:{func:e.setTheme,arg:11},SECTION_KEY:{func:e.setTheme,arg:0},SECTION_KEY_FF:{func:e.setTheme,arg:0}},r=new FileReader,i="";return r.addEventListener("loadend",v),{addEventListeners:b}}),define("ui-control/controler",["../utl/formatting","../utl/paramslikker","../utl/browserutl","./eventmap","./actions"],function(e,t,n,r,i){function h(){n.localStorageOK()&&(localStorage.getItem(f)&&i.setSpeed(localStorage.getItem(f)),localStorage.getItem(o)&&i.initiateText(localStorage.getItem(o),""),localStorage.getItem(u)&&i.setDocumentTitle(localStorage.getItem(u)),localStorage.getItem(a)&&i.setPos(localStorage.getItem(a)),localStorage.getItem(l)&&i.setTheme(localStorage.getItem(l)))}function p(){c.speed&&i.setSpeed(c.speed),c.theme&&i.setTheme(c.theme),c.text&&i.initiateText(decodeURIComponent(c.text),"url"),c.pos&&i.setPos(c.pos),c.loop&&e.sanitizeBooleanesque(c.loop)?i.setLooping(!0):i.setLooping(!1),c.play&&e.sanitizeBooleanesque(c.play)&&window.setTimeout(i.play,s);var t={thoughts:"samples/thoughts.txt",1984:"samples/1984.txt",freedom:"samples/freedom.txt",intro:"samples/intro.txt",laozi:"samples/laozi.txt"};!c.text&&c.canned&&n.ajax(decodeURIComponent(t[c.canned]),function(e){i.initiateText(e.target.response,c.canned)},function(){}),!c.text&&c.url&&n.ajax(decodeURIComponent(c.url),function(e){i.initiateText(e.target.response,c.url)},function(){})}var s=1e3,o="buffer",u="title",a="position",f="speed",l="theme",c=t.getParams(window.location.search);r.addEventListeners(),h(),p()}),require(["ui-control/controler"],function(e){}),define("wordywordy",function(){});