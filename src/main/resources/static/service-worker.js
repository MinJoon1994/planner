self.addEventListener('install', (e) => {
    self.skipWaiting(); // Force activation
    e.waitUntil(
        caches.open('dotori-store').then((cache) => cache.addAll([
            './',
            './index.html',
            './style.css',
            './app.js',
            './manifest.json',
            './icon-192.png',
            './icon-512.png'
        ])),
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim()); // Take control immediately
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
