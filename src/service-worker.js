var CACHE_NAME = 'wordywordy-0-2-3';
var urlsToCache = [
    "./",
    "./index.html",
    "./service-worker.js",
    "./lib/require.js",
    "./lib/screenfull.js",
    "./font/controls.eot",
    "./font/controls.svg",
    "./font/controls.ttf",
    "./font/controls.woff",
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
    "./script/wordywordy.js",
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
    "./style/themes/sepia.css",
    "./style/themes/zany.css",
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
