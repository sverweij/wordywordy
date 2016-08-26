(function() {
    'use strict';
    var CACHE_NAME = 'wordywordy-{{version}}';
    var urlsToCache = [
        "./",
        "./index.html",
        "./service-worker.js?{{commit}}",
        "./service-worker.js",
        "./lib/require.js?{{commit}}",
        "./lib/require.js",
        "./script/wordywordy.js?{{commit}}",
        "./script/wordywordy.js",
        "./lib/screenfull.js",
        "./font/controls.eot?tf5yt7",
        "./font/controls.svg?tf5yt7",
        "./font/controls.ttf?tf5yt7",
        "./font/controls.woff?tf5yt7#controls",
        "./font/OpenDyslexic-Italic.otf",
        "./font/OpenDyslexicAlta-Regular.otf",
        "./font/Roboto-Italic.ttf",
        "./font/Roboto-Light.ttf",
        "./font/Roboto-LightItalic.ttf",
        "./font/Roboto-Regular.ttf",
        "./font/Roboto-Thin.ttf",
        "./font/Roboto-ThinItalic.ttf",
        "./images/background.jpg",
        "./images/tail.png",
        "./samples/1984.txt",
        "./samples/freedom.txt",
        "./samples/intro.nl.txt",
        "./samples/intro.txt",
        "./samples/laozi.txt",
        "./samples/thoughts.txt",
        "./style/themes/057.css",
        "./style/themes/074.css",
        "./style/themes/220.css",
        "./style/themes/background.css",
        "./style/themes/day.css",
        "./style/themes/dyslexia-day.css",
        "./style/themes/dyslexia-high-contrast.css",
        "./style/themes/dyslexia-low-contrast.css",
        "./style/themes/dyslexia-night.css",
        "./style/themes/dyslexia-sepia.css",
        "./style/themes/high-contrast.css",
        "./style/themes/hv.css",
        "./style/themes/liberal.css",
        "./style/themes/low-contrast-fat-font.css",
        "./style/themes/low-contrast.css",
        "./style/themes/night-fat-font.css",
        "./style/themes/night.css",
        "./style/themes/progressive.css",
        "./style/themes/sepia-fat-font.css",
        "./style/themes/sepia.css?{{commit}}",
        "./style/themes/sepia.css",
        "./style/themes/zany.css",
        "./style/wordywordy.css?{{commit}}",
        "./style/wordywordy.css",
        "./favicon.ico"
    ];

    function isSimilarCache(pCacheName) {
        return function(pKey){
            var lCacheRootName = pCacheName.split('-')[0];
            var lCacheVersion  = pCacheName.split('-')[1];
            var lMatch         = pKey.match(
                                    new RegExp("(" + lCacheRootName + ")-(.+)")
                                );

            return Boolean(lMatch) && lMatch[2] !== lCacheVersion;
        };
    }
    /*
        expect(isSimilarCache("lalala-1.2.3")("lalala-1.2.1")).to.be.true;
        expect(isSimilarCache("lalala-1.2.3")("lalala-1.2.4")).to.be.true;
        expect(isSimilarCache("lalala-1.2.3")("lalala-poink")).to.be.true;
        expect(isSimilarCache("lalala-1.2.3")("lalala-1.2.3a")).to.be.true;
        expect(isSimilarCache("lalala-1.2.3")("lalala-1.2.3-a")).to.be.true;
        expect(isSimilarCache("lalala-1.2.3")("lalala-1.2.3")).to.be.false;
        expect(isSimilarCache("lalala-1.2.3")("lalala")).to.be.false;
        expect(isSimilarCache("lalala-1.2.3")("totally different")).to.be.false;
        expect(isSimilarCache("lalala")("lalala")).to.be.false;
        expect(isSimilarCache("lalala")("lalala-1.2.3")).to.be.false;
        expect(isSimilarCache("lalala-1.2.3")("lalala")).to.be.false;

     */
    function deleteCache (pKey){
        console.log("Removing old cache", pKey);
        caches.delete(pKey);
    }

    function removeSimilarCaches(pCacheName) {
        caches.keys().then(
            function(pKeys) {
                pKeys
                    .filter(isSimilarCache(pCacheName))
                    .forEach(deleteCache);
            }
        );
    }

    self.addEventListener('install', function(event) {
        // Perform install steps
        removeSimilarCaches(CACHE_NAME);
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function(cache) {
                    console.log('Opened cache');
                    return cache.addAll(urlsToCache);
                })
            );
    });

    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    return fetch(event.request);

                })
            );
    });

    /*
     * console statements are OK - I want to be able to quick-check while the
     * feature is experimental
     */
     /* eslint no-console: 0 */

     /*
      * actually this looks like a false positive - we're not using fs, and the
      * cache.open we actually use takes a var with a fixed value
      */
      /* eslint security/detect-non-literal-fs-filename: 0 */
}());
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
