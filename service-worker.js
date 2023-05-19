
self.addEventListener('install', function(event) {
  console.log('O Service Worker foi instalado.');
});


self.addEventListener('activate', function(event) {
  console.log('O Service Worker foi ativado.');
});


self.addEventListener('fetch', function(event) {
  console.log('Interceptando solicitação:', event.request.url);
});
