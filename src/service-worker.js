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
    "./style/themes/zany.css",
    "./style/wordywordy.css?{{commit}}",
    "./style/wordywordy.css",
    "./favicon.ico"
];

self.addEventListener('install', function(event) {
  // Perform install steps
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
      }
    )
  );
});
