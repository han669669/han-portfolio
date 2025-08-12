// Service Worker with aggressive caching strategies
const CACHE_VERSION = 'v2';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const VIDEO_CACHE = `videos-${CACHE_VERSION}`;

// Critical resources to cache immediately
const CRITICAL_CACHE = [
  '/',
  '/offline.html',
  '/favicon.svg',
];

// Cache expiration times (in seconds)
const CACHE_EXPIRATION = {
  images: 7 * 24 * 60 * 60, // 7 days
  videos: 30 * 24 * 60 * 60, // 30 days
  static: 24 * 60 * 60, // 1 day
  api: 5 * 60, // 5 minutes
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Installing Service Worker - Caching critical resources');
      return cache.addAll(CRITICAL_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const validCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, VIDEO_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!validCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper function to determine cache strategy based on request type
function getCacheStrategy(request) {
  const url = new URL(request.url);
  
  // Video files - cache first, long expiration
  if (url.pathname.match(/\.(mp4|webm|ogg)$/)) {
    return { cacheName: VIDEO_CACHE, strategy: 'cache-first' };
  }
  
  // Images - cache first, medium expiration
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/)) {
    return { cacheName: IMAGE_CACHE, strategy: 'cache-first' };
  }
  
  // API calls - network first, short expiration
  if (url.pathname.includes('/api/')) {
    return { cacheName: RUNTIME_CACHE, strategy: 'network-first' };
  }
  
  // Static assets - stale while revalidate
  if (url.pathname.match(/\.(css|js|woff2?)$/)) {
    return { cacheName: CACHE_NAME, strategy: 'stale-while-revalidate' };
  }
  
  // HTML pages - network first
  return { cacheName: RUNTIME_CACHE, strategy: 'network-first' };
}

// Fetch event with multiple caching strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const { cacheName, strategy } = getCacheStrategy(event.request);
  
  if (strategy === 'cache-first') {
    // Cache first strategy - ideal for static assets
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
    );
  } else if (strategy === 'network-first') {
    // Network first strategy - ideal for dynamic content
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match('/offline.html');
          });
        })
    );
  } else {
    // Stale while revalidate - serve from cache, update in background
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
          
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Sync any offline data when connection is restored
      console.log('Background sync: Syncing offline data')
    );
  }
});

// Periodic background sync for keeping cache fresh
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(CRITICAL_CACHE);
      })
    );
  }
});
