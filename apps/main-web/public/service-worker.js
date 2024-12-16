self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // 캐싱 로직
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // 네트워크 요청 캐싱 전략
});
