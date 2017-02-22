(function() {
    'use strict';
    var CACHE_NAME = 'wordywordy-0.4.6';
    var urlsToCache = [
        "./",
        "./index.html",
        "./service-worker.js?f072a4d6d82316f7",
        "./service-worker.js",
        "./manifest.json",
        "./lib/require.js?f072a4d6d82316f7",
        "./lib/require.js",
        "./script/wordywordy.js?f072a4d6d82316f7",
        "./script/wordywordy.js",
        "./lib/screenfull.js",
        "./font/controls.eot?tf5yt7",
        "./font/controls.svg?tf5yt7",
        "./font/controls.ttf?tf5yt7",
        "./font/controls.woff?tf5yt7#controls",
        "./font/057.woff",
        "./font/074.woff",
        "./font/OpenDyslexic-Italic.otf",
        "./font/OpenDyslexicAlta-Regular.otf",
        "./font/Roboto-Italic.woff",
        "./font/Roboto-Light.woff",
        "./font/Roboto-LightItalic.woff",
        "./font/Roboto-Regular.woff",
        "./font/Roboto-Thin.woff",
        "./font/Roboto-ThinItalic.woff",
        "./font/Gochi_Hand_Regular.woff",
        "./images/background.jpg",
        "./images/tail.png",
        "./images/057pattern.png",
        "./images/wordywordy.png",
        "./samples/1984.txt",
        "./samples/freedom.txt",
        "./samples/intro.nl.txt",
        "./samples/intro.txt",
        "./samples/laozi.txt",
        "./samples/thoughts.txt",
        "./style/themes/057.css",
        "./style/themes/074.css",
        "./style/themes/220.css",
        "./style/themes/fountainpen.css",
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
        "./style/themes/sepia.css?f072a4d6d82316f7",
        "./style/themes/sepia.css",
        "./style/themes/zany.css",
        "./style/wordywordy.css?f072a4d6d82316f7",
        "./style/wordywordy.css",
        "./favicon.ico"
    ];

    function isSimilarCacheName(pCacheName) {
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
        expect(isSimilarCacheName("lalala-1.2.3")("lalala-1.2.1")).to.be.true;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala-1.2.4")).to.be.true;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala-poink")).to.be.true;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala-1.2.3a")).to.be.true;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala-1.2.3-a")).to.be.true;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala-1.2.3")).to.be.false;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala")).to.be.false;
        expect(isSimilarCacheName("lalala-1.2.3")("totally different")).to.be.false;
        expect(isSimilarCacheName("lalala")("lalala")).to.be.false;
        expect(isSimilarCacheName("lalala")("lalala-1.2.3")).to.be.false;
        expect(isSimilarCacheName("lalala-1.2.3")("lalala")).to.be.false;

     */
    function deleteCache (pKey){
        console.log("Removing old cache", pKey);
        caches.delete(pKey);
    }

    function removeSimilarCaches(pCacheName) {
        caches.keys().then(
            function(pKeys) {
                pKeys
                    .filter(isSimilarCacheName(pCacheName))
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
