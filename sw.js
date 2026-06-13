// 识数教学 - Service Worker (离线缓存)
var CACHE = 'shishu-v1';
var FILES = [
  './index.html',
  './manifest.json',
  './icon.svg'
];

// 安装：缓存所有文件
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(FILES);
    })
  );
});

// 请求：缓存优先，网络兜底
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request);
    })
  );
});
