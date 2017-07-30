/* eslint security/detect-object-injection:0 */
/* the [variable] constructs here accept user input in
 * one place - where it's sanitized
 */
define(["../utl/formatting"],
    function(fmt) {
        "use strict";

        var rCurrentTheme = 1;
        var rStyleSheets = [
            {nr: 0, title: "Zany", href: "style/themes/zany.css"},
            {nr: 1, title: "Sepia", href: "style/themes/sepia.css"},
            {nr: 2, title: "Day", href: "style/themes/day.css"},
            {nr: 3, title: "Night", href: "style/themes/night.css"},
            {nr: 4, title: "Low contrast", href: "style/themes/low-contrast.css"},
            {nr: 5, title: "High contrast", href: "style/themes/high-contrast.css"},
            {nr: 6, title: "Dyslexia - sepia", href: "style/themes/dyslexia-sepia.css"},
            {nr: 7, title: "Dyslexia - day", href: "style/themes/dyslexia-day.css"},
            {nr: 8, title: "Dyslexia - night", href: "style/themes/dyslexia-night.css"},
            {nr: 9, title: "Dyslexia - low contrast", href: "style/themes/dyslexia-low-contrast.css"},
            {nr: 10, title: "Dyslexia - high contrast", href: "style/themes/dyslexia-high-contrast.css"},
            {nr: 11, title: "Low contrast fat font", href: "style/themes/low-contrast-fat-font.css"},
            {nr: 12, title: "Sepia fat font", href: "style/themes/sepia-fat-font.css"},
            {nr: 13, title: "Night fat font", href: "style/themes/night-fat-font.css"},
            {nr: 14, title: "220", href: "style/themes/220.css"},
            {nr: 15, title: "057", href: "style/themes/057.css"},
            {nr: 16, title: "074", href: "style/themes/074.css"},
            {nr: 17, title: "HV", href: "style/themes/hv.css"},
            {nr: 18, title: "liberal", href: "style/themes/liberal.css"},
            {nr: 19, title: "progressive", href: "style/themes/progressive.css"},
            {nr: 20, title: "Fountain Pen", href: "style/themes/fountainpen.css"},
            {nr: 21, title: "background", href: "style/themes/background.css"}
        ];

        function cycleTheme(){
            rCurrentTheme++;
            if (rCurrentTheme >= rStyleSheets.length){
                rCurrentTheme = 0;
            }
            setTheme(rCurrentTheme);
        }

        function setTheme(pThemeNumber){
            rCurrentTheme =
            Math.max(
                Math.min(
                    fmt.sanitizeNumber(pThemeNumber, 1),
                    rStyleSheets.length - 1
                ),
                0
            );
            window.customtheme.href = rStyleSheets[rCurrentTheme].href;
        }

        function getCurrentTheme(){
            return rStyleSheets[rCurrentTheme];
        }

        return {
            cycleTheme: cycleTheme,
            setTheme: setTheme,
            getCurrentTheme: getCurrentTheme
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
