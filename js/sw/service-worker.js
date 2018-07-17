/*let cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/style.css',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js'
];
let cacheName = 'v2';*/


self.addEventListener('install', function(event) {
  console.log("[ServiceWorker] Installed");
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './css/style.css',
        './data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js'
      ]);
    })
  );
});
self.addEventListener('activate', function(event) {
  console.log("[ServiceWorker] Activated");

  event.waitUntil(

    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {

        if (thisCacheName !== cacheName) {
          console.log ("[ServiceWorker] Removing Cached Files from v1");
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});
self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fetching", event.request.url);
});
