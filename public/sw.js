// Listen for the following to intercept
self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open('v0').then(function (cache) {
      return cache.addAll([
        '/public/scripts/third-party/bootstrap.js',
        '/public/scripts/third-party/jq.js',
        '/public/scripts/third-party/react-dom.development.js',
        '/public/scripts/third-party/react-dom.production.min.js',
        '/public/scripts/third-party/react.development.js',
        '/public/scripts/bundles/vendors~main.bundle.js',
        '/public/images/account.png',
        '/public/index.html',
        '/public/styles/style.css',
        '/public/styles/third-party/bootstrap.css'
      ])
    })
    .catch(err => {
      console.error(err)
    })
  )
})

self.addEventListener('fetch', function (ev) {
  ev.respondWith(
    caches.match(ev.request)
  )
})