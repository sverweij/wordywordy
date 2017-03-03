/* eslint no-control-regex: 0, no-useless-escape: 0 */
/* on disabling detect-non-literal-regexp here:
   it is a false positive (/ acceptable risk) because the regexp only
   receives a locally declared variable (which is not a const only
   because the target environments don't support it)
*/
/* eslint security/detect-non-literal-regexp: 0 */
/* istanbul ignore else */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    var SENTENCE_END_CHARS = "\.\?!\u3002\uFF1F";

    /*
     * Picture scripts (e.g. Chinese, Korean) need a different treatment.
     * These unicode code pointranges come from
     * http://www.unicode.org/Public/UCD/latest/ucd/Scripts.txt
     *
     * Japanese Hiragana and Katakana have been skipped intentionally as
     * these are actually phonetic scripts
     *
     */

    var HAN_CHAR  = "\u2E80-\u2E99|\u2E9B-\u2EF3|\u2F00-\u2FD5|\u3005|\u3007|\u3021-\u3029|\u3038-\u303A|\u303B|\u3400-\u4DB5|\u4E00-\u9FCC|\uF900-\uFA6D|\uFA70-\uFAD9";
    var YI_CHAR   = "\uA000-\uA014|\uA015|\uA016-\uA48C|\uA490-\uA4C6";
    var HANGUL_CHAR = "\u1100-\u11FF|\u302E-\u302F|\u3131-\u318E|\u3200-\u321E|\u3260-\u327E|\uA960-\uA97C|\uAC00-\uD7A3|\uD7B0-\uD7C6|\uD7CB-\uD7FB|\uFFA0-\uFFBE|\uFFC2-\uFFC7|\uFFCA-\uFFCF|\uFFD2-\uFFD7|\uFFDA-\uFFDC";
    var CJK_CHAR  = HAN_CHAR + "|" + YI_CHAR + "|" + HANGUL_CHAR;

    return {
        /*
         * SPACES_RE includes all spaces as mentioned in
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
         * under \s, except the non-breaking space character, which is misused
         * in the time algorithm.
         */
        SPACES_RE        : new RegExp("[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+"),
        SENTENCE_END_RE  : new RegExp("[" + SENTENCE_END_CHARS + "]"),
        PARAGRAPH_END_RE : new RegExp("\u00A0"),
        CJK_RE           : new RegExp("([" + CJK_CHAR + "])", "g"),

        MILLISECONDS_PER_MINUTE : 60000 // milliseconds
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
