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

/*
 This file is part of WordyWordy.

 WordyWordy is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WordyWordy is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNEdq.SS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WordyWordy.  If not, see <http://www.gnu.org/licenses/>.
 */

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

define("utl/formatting",[],function(){function i(i){var s=i/e,o=Math.max(0,s/t),u=Math.max(0,o/n),a=Math.max(0,u/r),f=Math.max(0,i-Math.floor(s)*e);return s=Math.max(0,s-Math.floor(o)*t),o=Math.max(0,o-Math.floor(u)*n),u=Math.max(0,u-Math.floor(a)*r),{days:Math.floor(a),hours:Math.floor(u),minutes:Math.floor(o),seconds:Math.floor(s),milliseconds:f}}function s(e){return e<10?"0"+e:e.toString()}var e=1e3,t=60,n=60,r=24;return{formatTime:function(e,t){var n=i(e);t||(t=!1);var r=(n.hours>0?n.hours+":":"")+s(n.minutes)+":"+s(n.seconds)+(t?"."+n.milliseconds:"");return r},sanitizeNumber:function(e,t){typeof e=="string"&&(e=parseInt(e));if(typeof e!="number"||isNaN(e))e=t;return e},sanitizeBooleanesque:function(e){return["1","true","y","yes"].indexOf(e)>-1}}}),define("chopper/chopper",["../utl/formatting"],function(e){function D(t,n){N=t.replace(/[\-]{4,}/g,"---").replace(/[_]{4,}/g,"___").replace(/[=]{4,}/g,"===").replace(/[+]{4,}/g,"+++").replace(/[~]{4,}/g,"~~~").replace(/\.\.\./g,"…").replace(/([a-zA-Z])([\(\)\[\]\{\}\.\?\!:;\-,…\/|\u2010-\u2015]{1,2})([a-zA-Z])/g,"$1$2 $3").replace(/&nbsp;/g," ").replace(/\u00A0/g," ").replace(/\r\n/g,"\n").replace(/[\n]{2,}/g,"  ").replace(T," $1").split(g),C=N.length,B(e.sanitizeNumber(n,0))}function P(e){B(L+e)}function H(e){B(L-e)}function B(e){L=Math.min(C,Math.max(0,e))}function j(){return L}function F(){return C>0?100*(L/C):0}function I(v){v=e.sanitizeNumber(v,n),k=Math.min(r,Math.max(t,v));var m=K(v);A=i*m,O=s*m,M=[{re:b,delay:p*m},{re:/[;:…–\u00B7|\u2010-\u2015]/,delay:h*m},{re:/[-,\/\uFF0C]/,delay:c*m},{re:/[\(\)\[\]\{\}]/,delay:l*m},{re:/["'‘’“”]/,delay:f*m},{re:/\u00A0/,delay:d*m},{re:/[0-9=\+]/,delay:u*m},{re:/[A-Z]/,delay:a*m},{re:T,delay:o*m}],_=M.length}function q(){return k}function R(e){I(k+e)}function U(e){I(k-e)}function z(){var e=!1;N[L]&&N[L].match(b)&&L--;var t=Math.max(L-m,0);for(L;!e&&L>t;L--)N[L]&&N[L].match(b)&&(e=!0,L+=2)}function W(){var e=!1,t=Math.min(L+m,C);for(L;!e&&L<t;L++)N[L]&&N[L].match(b)&&(e=!0,L-=1)}function X(){return C}function V(){return N[L]}function $(e){for(var t=0;t<_;t++)if(M[t].re.test(e))return M[t].delay;return O}function J(){var e=0;for(var t=0;t<C;t++)e+=G(N[t]);return C/(e/v)}function K(e){return v/e/300}function Q(){return G(N[L])}function G(e){var t=0;if(e){t=A;for(var n=0,r=e.length;n<r;n++)t+=$(e[n])}return t}function Y(){return v*(C-L)/k}var t=60,n=300,r=600,i=100,s=30,o=250,u=50,a=50,f=40,l=100,c=180,h=250,p=400,d=250,v=6e4,m=42,g=new RegExp("[ \f\n\r	 ᠎           \u2028\u2029  　]+"),y=".?!。？",b=new RegExp("["+y+"]"),w="⺀-⺙|⺛-⻳|⼀-⿕|々|〇|〡-〩|〸-〺|〻|㐀-䶵|一-鿌|豈-舘|並-龎",E="ꀀ-ꀔ|ꀕ|ꀖ-ꒌ|꒐-꓆",S="ᄀ-ᇿ|〮-〯|ㄱ-ㆎ|㈀-㈞|㉠-㉾|ꥠ-ꥼ|가-힣|ힰ-ퟆ|ퟋ-ퟻ|ﾠ-ﾾ|ￂ-ￇ|ￊ-ￏ|ￒ-ￗ|ￚ-ￜ",x=w+"|"+E+"|"+S,T=new RegExp("(["+x+"])","g"),N=[],C=0,k=n,L=0,A=i*K(k),O=s*K(k),M=[],_=0;return{init:D,getSpeed:q,setSpeed:I,incSpeed:R,decSpeed:U,getCurrentWord:V,getDisplayTime:Q,getLength:X,getPercentage:F,getEstimatedTimeToGo:Y,getAverageSpeed:J,getPosition:j,setPosition:B,incPosition:P,decPosition:H,gotoEndOfSentence:W,gotoStartOfSentence:z}}),define("utl/stopwatch",[],function(){function e(){this.reset=function(){this.state="paused",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},this.reset()}return e.prototype.start=function(){this.state="running",this.startTime=Date.now(),this.pauseStartTime=this.startTime,this.cumulativePauses=0},e.prototype.resume=function(){this.state="running";var e=Date.now()-this.pauseStartTime;this.cumulativePauses+=e},e.prototype.pause=function(){this.state!=="paused"&&(this.state="paused",this.pauseStartTime=Date.now())},e.prototype.getTimeElapsed=function(){return this.state==="running"?Date.now()-this.startTime-this.cumulativePauses:this.pauseStartTime-this.startTime-this.cumulativePauses},{Stopwatch:e}}),define("utl/paramslikker",[],function(){return{getParams:function(e){var t={};if(e){var n;e.slice(1).split("&").forEach(function(e){n=e.split("="),2===n.length&&(t[n[0]]=unescape(n[1]))})}return t}}}),define("utl/browserutl",[],function(){return{ajax:function(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(e){e.target.readyState!==4||!!e.target.status&&e.target.status!==200?n(e):t(e)},r.open("GET",e),r.responseType="text",r.send()}}}),define("ui-control/controler",["../chopper/chopper","../utl/formatting","../utl/stopwatch","../utl/paramslikker","../utl/browserutl"],function(e,t,n,r,i){function ct(t){o=0,e.init(t,0),window.__avgSpeed.textContent=e.getAverageSpeed().toFixed(1),xt(),at.start(),mt()}function ht(){u&&window.clearTimeout(u),h===!0&&(window.__output.className="playing"),s&&(e.getPosition()<e.getLength()?(u=window.setTimeout(ht,e.getDisplayTime()),pt(e.getCurrentWord(),!0),e.incPosition(1)):h===!0?(e.setPosition(0),window.__output.className="reload",u=window.setTimeout(ht,1e3)):(window.__output.textContent="",window.__output.className="smile",gt()))}function pt(t,n){undefined!==t&&(window.__output.textContent=t,window.__percentage.setAttribute("style","width: "+e.getPercentage()+"%;"),c&&dt(),n&&o++)}function dt(){var n=at.getTimeElapsed(),r=n/et,i=r>0?o/r:0,s=e.getEstimatedTimeToGo(),u=n+s;window.__documentTitle.textContent=p,window.__selectedSpeed.textContent=e.getSpeed(),window.__actualSpeed.textContent=i.toFixed(0),window.__position.textContent=e.getPosition(),window.__positionInPercent.textContent=e.getPercentage().toFixed(1),window.__wordsPlayed.textContent=o,window.__wordsTotal.textContent=e.getLength(),window.__timeElapsed.textContent=t.formatTime(n),window.__timeToGo.textContent=t.formatTime(s),window.__timeTotal.textContent=t.formatTime(u)}function vt(){c=!c,c?(window.__status.style.display="inline",dt()):window.__status.style.display="none"}function mt(){at.resume(),s=!0,window.__output.className="playing",window.__btn_playpause.className=Z,document.title=G+" "+p+" - "+d,ht()}function gt(){at.pause(),s=!1,document.title=p+" - "+d,window.__btn_playpause.className=Y,Nt()&&localStorage.setItem("position",e.getPosition())}function yt(){f&&window.clearTimeout(f),window.__controls.className="",f=window.setTimeout(function(){window.__controls.className="fade-away"},nt)}function bt(e){a&&window.clearTimeout(a),window.__toast.style.display="block",window.__toast.className="",window.__toast.innerHTML=e,a=window.setTimeout(function(){window.__toast.className="fade-away"},nt)}function wt(e){p=e,Nt()&&localStorage.setItem(it,e)}function Et(t){t&&gt(),pt(e.getCurrentWord(),!1),bt(e.getPercentage().toFixed(1)+"%")}function St(e){dt(),bt(e+" wpm"),Nt()&&localStorage.setItem(ot,e)}function xt(){bt("<span class='icon-stopwatch'></span> -"+t.formatTime(e.getEstimatedTimeToGo()))}function Tt(e){var n=document.querySelectorAll("link[type='text/css']"),r=document.querySelectorAll("meta[http-equiv=Default-Style]")[0],i=n.length;if(i>1&&r){e=Math.min(i-1,Math.max(1,t.sanitizeNumber(e,1)));if(document.styleSheets.length===i)for(var s=1;s<i;s++)s===e?document.styleSheets[s].disabled=!1:document.styleSheets[s].disabled=!0;else r.content=n[e].title;bt(n[e].title),Nt()&&localStorage.setItem(ut,e)}}function Nt(){return typeof localStorage!="undefined"}function Ct(){Et(!0),window.__input_file.click()}function kt(t){e.setPosition(t),Et(!0)}function Lt(){kt(0)}function At(){e.decPosition(1),Et(!0)}function Ot(){s=!s,s?mt():gt()}function Mt(){e.incPosition(1),Et(!0)}function _t(){kt(e.getLength())}function Dt(){e.incSpeed(5),St(e.getSpeed())}function Pt(){e.decSpeed(5),St(e.getSpeed())}function Ht(e){e&&e.clipboardData&&(window.__output.className="",Nt()&&localStorage.setItem(rt,e.clipboardData.getData("text/plain")),wt("clipboard"),ct(e.clipboardData.getData("text/plain"))),e.preventDefault()}function Bt(e){e.preventDefault()}function jt(e){e.preventDefault()}function Ft(e){e.preventDefault(),window.__output.className="breathing"}function It(e){e.preventDefault()}function qt(e){e.preventDefault(),window.__output.className="openmouth"}function Rt(e){e.preventDefault(),window.__output.className="breathing"}function Ut(e){for(var t=0;t<e.length;t++)if("text/plain"===e[t])return!0;return!1}function zt(e){window.__output.className="playing";if(e.dataTransfer.files.length>0){var t=e.dataTransfer.files[0];t.type==="text/plain"&&(ft.readAsText(t),wt(t.name))}else Ut(e.dataTransfer.types)&&(Nt()&&localStorage.setItem(rt,e.dataTransfer.getData("text/plain")),wt("drag/ drop"),ct(e.dataTransfer.getData("text/plain")));e.preventDefault()}function Wt(t){var n=t.clientX/window.__percentagewrap.scrollWidth;kt(Math.floor(n*e.getLength()))}function Xt(t){B===t.keyCode&&Lt(),N===t.keyCode&&(ct(""),Nt()&&(localStorage.removeItem(rt),localStorage.removeItem(it),localStorage.removeItem(st),localStorage.removeItem(ot),localStorage.removeItem(ut)),Lt(),bt("Forgot everything")),j===t.keyCode&&_t(),(I===t.keyCode||F===t.keyCode||q===t.keyCode)&&vt(),M===t.keyCode&&xt(),(v===t.keyCode||m===t.keyCode)&&Ot(),(g===t.keyCode||x===t.keyCode)&&At();if(H===t.keyCode||k===t.keyCode)e.gotoEndOfSentence(),Et(!0);(b===t.keyCode||C===t.keyCode)&&Mt();if(P===t.keyCode||A===t.keyCode)e.gotoStartOfSentence(),Et(!0);(w===t.keyCode||O===t.keyCode)&&Pt(),(y===t.keyCode||D==t.keyCode)&&Dt(),L===t.keyCode&&Ct(),T===t.keyCode&&(Nt()&&localStorage.setItem(st,e.getPosition()),bt("position saved")),_===t.keyCode&&bt(d+" ${version}"),U===t.keyCode&&Tt(1),z===t.keyCode&&Tt(2),W===t.keyCode&&Tt(3),X===t.keyCode&&Tt(4),V===t.keyCode&&Tt(5),$===t.keyCode&&Tt(6),J===t.keyCode&&Tt(7),K===t.keyCode&&Tt(8),Q===t.keyCode&&Tt(9),R===t.keyCode&&Tt(10),(E===t.keyCode||S===t.keyCode)&&Tt(11),window.__droparea.value=""}function Vt(e){e.preventDefault(),e.deltaY?e.deltaY>0?Mt():e.deltaY<0&&At():e.deltaX&&e.deltaX!==0&&e.deltaY===0&&(e.deltaX>0?At():e.deltaX<0&&Mt()),Et(!0)}function $t(e){e&&e.target&&e.target.result&&(Nt()&&localStorage.setItem(rt,e.target.result),ct(e.target.result))}function Jt(e){if(e.target.files.length>0){var t=e.target.files[0];t.type==="text/plain"&&(ft.readAsText(t),wt(t.name))}}function Kt(){l||yt()}function Qt(){f&&window.clearTimeout(f),l=!0,window.__controls.className=""}function Gt(){l=!1}var s=!1,o=0,u,a,f,l=!1,c=!1,h=!1,p="",d="WordyWordy",v=32,m=13,g=37,y=38,b=39,w=40,E=0,S=192,x=65,T=66,N=67,C=68,k=69,L=79,A=81,O=83,M=84,_=86,D=87,P=33,H=34,B=36,j=35,F=188,I=190,q=191,R=48,U=49,z=50,W=51,X=52,V=53,$=54,J=55,K=56,Q=57,G="▷",Y="icon-play3",Z="icon-pause2",et=6e4,tt=1e3,nt=2200,rt="buffer",it="title",st="position",ot="speed",ut="theme",at=new n.Stopwatch,ft=new FileReader,lt=r.getParams(window.location.search);ft.addEventListener("loadend",$t),window.__droparea.addEventListener("drag",Bt,!0),window.__droparea.addEventListener("dragenter",jt,!0),window.__droparea.addEventListener("dragleave",Ft,!0),window.__droparea.addEventListener("dragstart",It,!0),window.__droparea.addEventListener("dragover",qt,!0),window.__droparea.addEventListener("dragend",Rt,!0),window.__droparea.addEventListener("paste",Ht,!0),window.__droparea.addEventListener("drop",zt,!0),window.__percentagewrap.addEventListener("click",Wt,!0),window.__uparea.addEventListener("click",Dt,!0),window.__downarea.addEventListener("click",Pt,!0),window.__leftarea.addEventListener("click",At,!0),window.__rightarea.addEventListener("click",Ot,!0),window.__input_file.addEventListener("change",Jt,!0),window.__btn_open.addEventListener("click",Ct,!0),window.__btn_home.addEventListener("click",Lt,!0),window.__btn_dec.addEventListener("click",At,!0),window.__btn_playpause.addEventListener("click",Ot,!1),window.__btn_inc.addEventListener("click",Mt,!0),window.__btn_end.addEventListener("click",_t,!0),window.__btn_slowdown.addEventListener("click",Pt,!0),window.__btn_speedup.addEventListener("click",Dt,!0),window.__btn_info.addEventListener("click",vt,!0),window.document.body.addEventListener("keydown",Xt,!0),window.document.body.addEventListener("wheel",Vt,!0),window.document.body.addEventListener("mousemove",Kt,!0),window.__controls.addEventListener("mouseover",Qt,!0),window.__controls.addEventListener("mouseout",Gt,!0),Nt()&&(localStorage.getItem(ot)&&e.setSpeed(localStorage.getItem(ot)),localStorage.getItem(rt)&&e.init(localStorage.getItem(rt)),localStorage.getItem(it)&&wt(localStorage.getItem(it)),localStorage.getItem(st)&&(e.setPosition(localStorage.getItem(st)),pt(e.getCurrentWord())),localStorage.getItem(ut)&&Tt(localStorage.getItem(ut))),lt.speed&&e.setSpeed(lt.speed),lt.theme&&Tt(lt.theme),lt.text&&(e.init(decodeURIComponent(lt.text)),pt(e.getCurrentWord()),xt(),p="url"),lt.pos&&(e.setPosition(lt.pos),pt(e.getCurrentWord())),lt.loop&&t.sanitizeBooleanesque(lt.loop)?h=!0:h=!1,lt.play&&t.sanitizeBooleanesque(lt.play)&&window.setTimeout(mt,tt);var Yt={thoughts:"samples/thoughts.txt",1984:"samples/1984.txt",freedom:"samples/freedom.txt",intro:"samples/intro.txt",laozi:"samples/laozi.txt"};!lt.text&&lt.canned&&i.ajax(decodeURIComponent(Yt[lt.canned]),function(t){e.init(t.target.response),pt(e.getCurrentWord()),xt(),p=lt.canned},function(){}),!lt.text&&lt.url&&i.ajax(decodeURIComponent(lt.url),function(t){e.init(t.target.response),pt(e.getCurrentWord()),xt(),p=lt.url},function(){})}),require(["ui-control/controler"],function(e){}),define("wordywordy",function(){});