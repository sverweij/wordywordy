var constants = require("./constants");

module.exports = {
  tokenize: function (pString) {
    pString = pString || "";
    return pString
      .replace(/[-]{4,}/g, "---") //
      .replace(/[_]{4,}/g, "___") //
      .replace(/[=]{4,}/g, "===") //
      .replace(/[+]{4,}/g, "+++") //
      .replace(/[~]{4,}/g, "~~~") //
      .replace(/\.\.\./g, "\u2026") //
      .replace(
        /([a-zA-Z]{2,})([()[\]{}.?!:;\-,\u2026/|\u2010-\u2015]{1,2})([a-zA-Z]{2,})/g,
        "$1$2 $3"
      )
      .replace(/&nbsp;/g, " ") //
      .replace(/\u00A0/g, " ") //
      .replace(/\r\n/g, "\n") //
      .replace(/[\n]{2,}/g, "\u00A0 ") // so we can distinguish "paragraph" ends
      .replace(constants.CJK_RE, " $1") //
      .split(constants.SPACES_RE);
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
