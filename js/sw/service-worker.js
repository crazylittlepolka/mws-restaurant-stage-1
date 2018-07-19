var cacheName = 'v1';

self.addEventListener('install', function(event) {
  var filesToCache = [
    '/',
    '/index.html',
    //'./restaurant.html',
    '/css/style.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
  ];

  console.log("[ServiceWorker] Installed");

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching cacheFiles");

      return cache.addAll(filesToCache).catch(function(err) {
        console.log('Caches open failed ' + err);
      });

    })
  );
});
self.addEventListener('activate', function(event) {
  console.log("[ServiceWorker] Activated");


});

self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fetching", event.request.url);

  event.respondWith(

    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function(err) {
      return new Response('Not connected to the internet', {
        status: 404
      });

      console.log(err ,"no cache entry for: ", event.request.url);
    })
  );
});
