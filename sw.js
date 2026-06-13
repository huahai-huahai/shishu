// 识数教学 - Service Worker (离线缓存)
var CACHE = 'shishu-v2';

// 安装：激活后立即接管
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        './index.html',
        './manifest.json',
        './icon.svg'
      ]);
    })
  );
});

// 激活：清除旧缓存
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
});

// 请求：网络优先，离线兜底
self.addEventListener('fetch', function (e) {
  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request);
    })
  );
});
