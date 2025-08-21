// Service Worker with tuned caching strategies (versioned)
const CACHE_VERSION = 'v3';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const VIDEO_CACHE = `videos-${CACHE_VERSION}`;

// Critical resources to cache immediately (avoid caching HTML '/')
const CRITICAL_CACHE = [
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
  const pathname = url.pathname;
  const accept = request.headers.get('accept') || '';
  
  // Video files - cache first, long expiration
  if (pathname.match(/\.(mp4|webm|ogg)$/)) {
    return { cacheName: VIDEO_CACHE, strategy: 'cache-first' };
  }
  
  // Images - cache first, medium expiration
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/)) {
    return { cacheName: IMAGE_CACHE, strategy: 'cache-first' };
  }
  
  // API calls - network first, short expiration
  if (pathname.includes('/api/')) {
    return { cacheName: RUNTIME_CACHE, strategy: 'network-first' };
  }
  
  // Next.js static assets - stale while revalidate
  if (pathname.startsWith('/_next/static/')) {
    return { cacheName: CACHE_NAME, strategy: 'stale-while-revalidate' };
  }

  // Other static assets - stale while revalidate
  if (pathname.match(/\.(css|js|woff2?)$/)) {
    return { cacheName: CACHE_NAME, strategy: 'stale-while-revalidate' };
  }
  
  // HTML pages and Next data - handled as network-first in fetch; avoid long-lived cache
  return { cacheName: RUNTIME_CACHE, strategy: 'network-first' };
}

// Fetch event with multiple caching strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and non-HTTP(S) requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  const req = event.request;
  const url = new URL(req.url);
  const { cacheName, strategy } = getCacheStrategy(req);
  const isNavigate = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  const isNextData = url.pathname.startsWith('/_next/data/');
  
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
      fetch(req)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            // Do NOT cache navigational HTML or Next data JSON to avoid staleness after deploys
            const shouldSkipCache = isNavigate || isNextData;
            if (!shouldSkipCache) {
              const responseToCache = networkResponse.clone();
              caches.open(cacheName).then((cache) => {
                cache.put(req, responseToCache);
              });
            }
          }
          return networkResponse;
        })
        .catch(() => {
          // If navigation failed (likely offline), serve offline.html; otherwise try cache fallback
          if (isNavigate) {
            return caches.match('/offline.html');
          }
          return caches.match(req);
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
