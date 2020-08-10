const staticCacheName = "site-static-v1";
const assets = [
  "/",
  "/index.html",
  "/js/restaurantes.js",
  "/js/turistico.js",
  "/js/map.js",
  "/js/jQuery.js",
  "/src/img/cardPicture.jpg",
  "/src/img/homepic.png",
  "/src/css/main.css",
  "/src/css/card.css",
];
// i

// install event
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
