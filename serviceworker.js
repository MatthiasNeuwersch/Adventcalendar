let cache = 'adventkalender';
let filesToCache = [
    "img/bg.jpg"
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cache).then(function(cache) {
            return cache.addAll(filesToCache).then(() => console.log('Assets added to cache'))
                .catch(err => console.log('Error while fetching assets', err));
        })
    );
});
self.addEventListener("activate", event => {
});
self.addEventListener('fetch', function(event) {
});