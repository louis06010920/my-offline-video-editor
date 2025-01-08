// service-worker.js
const CACHE_NAME = 'video-editor-cache-v1';
// 列出所有必須離線的檔案
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './ffmpeg-core.js',
  './ffmpeg-core.wasm',
  './icon-192.png',
  './icon-512.png',
  // 若你拆分了其他 CSS/JS，全部放進來
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
