//current cache version
var cacheName = 'v3';

//service worker installation
self.addEventListener('install', function(event) {

  //files to be cached
  var filesToCache = [
    '/',
    '/index.html',
    './restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
  ];

  console.log("[ServiceWorker] Installed");

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching cacheFiles");

      //adding files to the cache
      return cache.addAll(filesToCache).catch(function(err) {
        console.log('Caches open failed ' + err);
      });

    })
  );
});
self.addEventListener('activate', function(event) {
  console.log("[ServiceWorker] Activated");

//we are deleting old caches versions
  event.waitUntil(

    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {

        if (thisCacheName !== cacheName) {

          console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
          return caches.delete(thisCacheName);
        }
      }))

    })
  )

});

//serve files from cache
self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fetching", event.request.url);

  event.respondWith(

    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function(err) {
      return new Response('<p>No internet connection!</p>', {
        status: 404
      });


    })
  );


});
