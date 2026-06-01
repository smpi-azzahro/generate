// Service Worker for Az-Zahro Teacher Permit Form
const CACHE_NAME = 'az-zahro-persuratan-v1.1';
const ASSETS_TO_CACHE = [
    './',
    './form-surat-izin-guru.html',
    './guru.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js',
    'https://azzahrolocare.github.io/persuratan/Kop%20SMP%20dan%20SMK%20Az-Zahro.png'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching shell assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

// Fetch event - serving from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cacheRes) => {
            return cacheRes || fetch(event.request);
        })
    );
});
