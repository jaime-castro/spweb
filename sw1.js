const CACHE_STATIC_NAME = 'static-v6';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';



function limpiarCache(cacheName, numeroItems) {

    caches.open(cacheName)
        .then(cache => {

            return cache.keys()
                .then(keys => {

                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }
                });


        });
}

self.addEventListener('install', e => {

    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {

            return cache.addAll([
                "/spweb/",
                "main.dart.js",
                "index.html",
                "manifest.json",
                "assets/NOTICES",
                "assets/AssetManifest.json",
                "assets/FontManifest.json",
            ]);

        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.addAll([
            "assets/1.png",
            "assets/2.png",
            "assets/3.png",
            "assets/4.png",
            "assets/5.png",
            "assets/6.png",
            "assets/7.png",
            "assets/8.png",
            "assets/9.png",
            "assets/10.png",
            "assets/11.png",
            "assets/12.png",
            "assets/13.png",
            "assets/14.png",
            "assets/15.png",
            "assets/16.png",
            "assets/17.png",
            "assets/18.png",
            "assets/19.png",
            "assets/20.png",
            "assets/21.png",
            "assets/22.png",
            "assets/23.png",
            "assets/24.png",
            "assets/25.png",
            "assets/26.png",
            "assets/27.png",
            "assets/28.png",
            "assets/29.png",
            "assets/30.png",
            "assets/31.png",
            "assets/32.png",
            "assets/33.png",
            "assets/34.png",
            "assets/35.png",
            "assets/36.png",
            "assets/37.png",
            "assets/38.png",
            "assets/39.png",
            "assets/40.png",
            "assets/41.png",
            "assets/42.png",
            "assets/43.png",
            "assets/44.png",
            "assets/45.png",
            "assets/46.png",
            "assets/47.png",
            "assets/48.png",
            "assets/49.png",
            "assets/50.png",
            "assets/51.png",
            "assets/52.png",
            "assets/53.png",
        ]));

    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            // static-v4
            if (key !== CACHE_STATIC_NAME && key.includes('static')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});

self.addEventListener('fetch', e => {


    // 2- Cache with Network Fallback
    const respuesta = caches.match(e.request)
        .then(res => {

            if (res) return res;

            // No existe el archivo

            return fetch(e.request).then(newResp => {

                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newResp);
                            limpiarCache(CACHE_DYNAMIC_NAME, 100);
                        });

                    return newResp.clone();
                })
                .catch(err => {

                    if (e.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/pages/offline.html');
                    }


                });


        });




    e.respondWith(respuesta);



});