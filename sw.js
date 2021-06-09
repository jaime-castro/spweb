const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

// Cache estático
const APP_SHELL = [
    // '/',
    "/spweb/",
    "main.dart.js",
    "index.html",
    "manifest.json",
    "assets/NOTICES",
    "assets/AssetManifest.json",
    "assets/FontManifest.json"
];

//Cache inmutable
const APP_SHELL_INMUTABLE = [
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
    "assets/song1.wav",
    "assets/song2.wav",
    "assets/song3.wav",
    "assets/song4.wav",
    "assets/assets/album1.png",
    "assets/assets/album2.png",
    "assets/assets/album3.png",
    "assets/assets/album4.png",
];

self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});




self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {

            return fetch(e.request).then(newRes => {

                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

            });

        }

    });

    e.respondWith(respuesta);

});

// Guardar  en el cache dinamico
function actualizaCacheDinamico(dynamicCache, req, res) {

    if (res.ok) {

        caches.open(dynamicCache).then(cache => {

            cache.put(req, res.clone());

            return res.clone();

        });

    } else {
        console.log("No pude escribir cache dinamico");
        return res;
    }

}