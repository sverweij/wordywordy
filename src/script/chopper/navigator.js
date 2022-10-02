/* eslint security/detect-object-injection: 0 */
/* we're using object[key] constructs a lot. As far as we
 * can see not a security risk as none of the keys are
 * user input
 */
var formatting = require("../utl/formatting");
var constants = require("./constants");

var MAX_SKIP_AHEAD = 69; // words

var rWords = [];
var rPosition = 0; // word

function _setPosition(pPosition) {
  rPosition = Math.min(rWords.length, Math.max(0, pPosition));
}

function _incPosition(pAmount) {
  _setPosition(rPosition + pAmount);
}

function _decPosition(pAmount) {
  _setPosition(rPosition - pAmount);
}

function gotoStartOfNextRE(pRE) {
  var lFound = false;

  var lLimit = Math.min(rPosition + MAX_SKIP_AHEAD, rWords.length);
  for (rPosition; !lFound && rPosition < lLimit; rPosition++) {
    if (rWords[rPosition] && rWords[rPosition].match(pRE)) {
      lFound = true;
    }
  }
}

module.exports = {
  init: function (pWordArray, pPosition) {
    rWords = pWordArray;
    _setPosition(formatting.sanitizeNumber(pPosition, 0));
  },
  setPosition: _setPosition,
  incPosition: _incPosition,
  decPosition: _decPosition,
  getCurrentWord: function () {
    return rWords[rPosition];
  },
  getLength: function () {
    return rWords.length;
  },
  getPercentage: function () {
    return rWords.length > 0 ? 100 * (rPosition / rWords.length) : 0;
  },
  getPosition: function () {
    return rPosition;
  },
  gotoEndOfSentence: function () {
    var lFound = false;
    var lLimit = Math.min(rPosition + MAX_SKIP_AHEAD, rWords.length);
    for (rPosition; !lFound && rPosition < lLimit; rPosition++) {
      if (
        rWords[rPosition] &&
        rWords[rPosition].match(constants.SENTENCE_END_RE)
      ) {
        lFound = true;
        rPosition -= 1;
      }
    }
  },
  gotoStartOfSentence: function () {
    var lFound = false;
    /*
     * when currently at the start of a sentence, hop to the
     * previous one
     */
    if (
      rWords[rPosition - 1] &&
      rWords[rPosition - 1].match(constants.SENTENCE_END_RE)
    ) {
      _decPosition(1);
    }
    /*
     * when currently at the end of a sentence, skip one word back
     * so the searching doesn't get stuck on the current word
     */
    if (
      rWords[rPosition] &&
      rWords[rPosition].match(constants.SENTENCE_END_RE)
    ) {
      _decPosition(1);
    }
    var lLimit = Math.max(rPosition - MAX_SKIP_AHEAD, 0);
    for (rPosition; !lFound && rPosition > lLimit; rPosition--) {
      if (
        rWords[rPosition] &&
        rWords[rPosition].match(constants.SENTENCE_END_RE)
      ) {
        lFound = true;
        rPosition += 2;
      }
    }
    /*
     * And if you're in a paragraph marker: bump one ahead
     */
    if (
      Boolean(rWords[rPosition]) &&
      rWords[rPosition].match(constants.PARAGRAPH_END_RE)
    ) {
      _incPosition(1);
    }
  },
  gotoStartOfNextSentence: function () {
    gotoStartOfNextRE(constants.SENTENCE_END_RE);
  },
  gotoStartOfNextParagraph: function () {
    gotoStartOfNextRE(constants.PARAGRAPH_END_RE);
  },
};

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
