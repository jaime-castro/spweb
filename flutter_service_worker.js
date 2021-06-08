"use strict";
//------------------Mi propio sw -------------------------------------------------------------
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

// Cache estático
const APP_SHELL = [
    // '/',
    "/spweb/",
    "main.dart.js",
    "index.html",
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

        return caches.open(dynamicCache).then(cache => {

            cache.put(req, res.clone());

            return res.clone();

        });

    } else {
        console.log("No pude escribir cache dinamico");
        return res;
    }



}

//-------------------------------------------------------------------------------
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
    "version.json": "0546f0e7726c385d700bf9f5e303d136",
    "index.html": "d17b37afe15aea8a04d7e71c35779f53",
    //  "/": "d17b37afe15aea8a04d7e71c35779f53",
    "main.dart.js": "c119f83596d9269f312bf8b131fc44fb",
    "favicon.png": "5dcef449791fa27946b3d35ad8803796",
    "icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
    "icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
    "manifest.json": "c7762d6a22a3758ae088024ca32a9f2a",
    "assets/48.png": "d751e40a96547ac05559bb20b5d00b5e",
    "assets/49.png": "6343dd50b377896c6f4cf59c4e69e7af",
    "assets/8.png": "a3a4340966ea5e5059f6ba14df5f5dd7",
    "assets/9.png": "b31641607cec29ffeeace252e83e1243",
    "assets/14.png": "78d2de8e24b33ed0dce8f393636e3580",
    "assets/28.png": "d04d4f8ae4a334d5c1a1c330401441bb",
    "assets/29.png": "695f438780af2e1aabbd5a0206f47a98",
    "assets/15.png": "6e935093b9f18baa767059bc2faf9b69",
    "assets/17.png": "16128fb7e0eec492f91de7252f1005ab",
    "assets/16.png": "14a41e2565a74e341c7f6b5ebedcc7ea",
    "assets/AssetManifest.json": "4c60c19360c996220dcaa8feec0db4d3",
    "assets/12.png": "7debbe7dde4460b4c612d23e7ea5289e",
    "assets/13.png": "9f1f84ea5a06681f9158832cc60debbb",
    "assets/39.png": "801e68dca309e6052bd3cc11e7fbb0f6",
    "assets/11.png": "cf3073d0d8903822294d664dee30e806",
    "assets/10.png": "468fe80f3eda8f5587df335feb3a72a4",
    "assets/38.png": "e380b318d6b4205374b28fd7672f50b4",
    "assets/NOTICES": "af4ce2500d23fc9ec329d79832f0cfbb",
    "assets/35.png": "94064db94e84b4a871eee2d6dcf19146",
    "assets/21.png": "e5034e210338914dfbebef74560a703d",
    "assets/20.png": "c5d576ada70e2fb149c32de9dd5e1782",
    "assets/34.png": "d792a544b53f0df9439072002963d9d7",
    "assets/song1.wav": "41518da2f7207a7054df62f3147008fe",
    "assets/song3.wav": "0337125021b1da2164b18804e078fb74",
    "assets/22.png": "d97b533ce212ec7af683bc82d56fba22",
    "assets/36.png": "886e70b86c413c60178a371409f6a670",
    "assets/37.png": "cfadef14b4fd11b05347df652b352550",
    "assets/23.png": "5109885d4a7c8216ea6fe2be4dce2e0b",
    "assets/song2.wav": "c63a5e87ed15a0b0a23608a82b6d0ea3",
    "assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
    "assets/27.png": "d89adfb3718b430a4054ea963c9332c4",
    "assets/33.png": "7e30f3489cf78c9d883217fa57bacd53",
    "assets/32.png": "3a2bfe2ca399c1f4f6aa1b634e9e1ee9",
    "assets/26.png": "67d64913f353cd3fbd7680bbb8f8030b",
    "assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
    "assets/18.png": "50e70c0b540e77dec821a83712260e1c",
    "assets/30.png": "afa57373b90a14e1641ae648e23a8af0",
    "assets/24.png": "cac0eb567639c5c426cf970ea4bb1440",
    "assets/25.png": "4f12a65f1e0dd0d823723f47b5d149c6",
    "assets/31.png": "a881363a41fc9b6705f15e87a5de7a87",
    "assets/19.png": "f813dd8cbd1d4d18fa4f5beac72278d0",
    "assets/song4.wav": "41518da2f7207a7054df62f3147008fe",
    "assets/4.png": "bc4df925862772cf967c4b4bb73f79b0",
    "assets/42.png": "6a23015475138c8ee9227b96d3c02341",
    "assets/album1.png": "5e1ee927a1eaa7987c1aa0a81fde168b",
    "assets/43.png": "feff32f768493e7732da4179c4b6c5db",
    "assets/5.png": "ce0a9e98eb349801ad9fadd861e81ae6",
    "assets/41.png": "31aff3b5e2fc654a45e407925123afe2",
    "assets/7.png": "4181fd711bc92127e580006dbefcb745",
    "assets/album2.png": "2dea09993741ef58ef6c3e23183ff7dc",
    "assets/album3.png": "0bd40d2c9061ff6cd4bb10c79e3a207b",
    "assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
    "assets/6.png": "75ea0a0e2b39c0b23fa4a63daf7ce3e3",
    "assets/40.png": "c985ea84380717b84318f071d2ce2818",
    "assets/assets/48.png": "d751e40a96547ac05559bb20b5d00b5e",
    "assets/assets/49.png": "6343dd50b377896c6f4cf59c4e69e7af",
    "assets/assets/8.png": "a3a4340966ea5e5059f6ba14df5f5dd7",
    "assets/assets/9.png": "b31641607cec29ffeeace252e83e1243",
    "assets/assets/14.png": "78d2de8e24b33ed0dce8f393636e3580",
    "assets/assets/28.png": "d04d4f8ae4a334d5c1a1c330401441bb",
    "assets/assets/29.png": "695f438780af2e1aabbd5a0206f47a98",
    "assets/assets/15.png": "6e935093b9f18baa767059bc2faf9b69",
    "assets/assets/17.png": "16128fb7e0eec492f91de7252f1005ab",
    "assets/assets/16.png": "14a41e2565a74e341c7f6b5ebedcc7ea",
    "assets/assets/12.png": "7debbe7dde4460b4c612d23e7ea5289e",
    "assets/assets/13.png": "9f1f84ea5a06681f9158832cc60debbb",
    "assets/assets/39.png": "801e68dca309e6052bd3cc11e7fbb0f6",
    "assets/assets/11.png": "cf3073d0d8903822294d664dee30e806",
    "assets/assets/10.png": "468fe80f3eda8f5587df335feb3a72a4",
    "assets/assets/38.png": "e380b318d6b4205374b28fd7672f50b4",
    "assets/assets/35.png": "94064db94e84b4a871eee2d6dcf19146",
    "assets/assets/21.png": "e5034e210338914dfbebef74560a703d",
    "assets/assets/20.png": "c5d576ada70e2fb149c32de9dd5e1782",
    "assets/assets/34.png": "d792a544b53f0df9439072002963d9d7",
    "assets/assets/song1.wav": "41518da2f7207a7054df62f3147008fe",
    "assets/assets/song3.wav": "0337125021b1da2164b18804e078fb74",
    "assets/assets/22.png": "d97b533ce212ec7af683bc82d56fba22",
    "assets/assets/36.png": "886e70b86c413c60178a371409f6a670",
    "assets/assets/37.png": "cfadef14b4fd11b05347df652b352550",
    "assets/assets/23.png": "5109885d4a7c8216ea6fe2be4dce2e0b",
    "assets/assets/song2.wav": "c63a5e87ed15a0b0a23608a82b6d0ea3",
    "assets/assets/27.png": "d89adfb3718b430a4054ea963c9332c4",
    "assets/assets/33.png": "7e30f3489cf78c9d883217fa57bacd53",
    "assets/assets/32.png": "3a2bfe2ca399c1f4f6aa1b634e9e1ee9",
    "assets/assets/26.png": "67d64913f353cd3fbd7680bbb8f8030b",
    "assets/assets/18.png": "50e70c0b540e77dec821a83712260e1c",
    "assets/assets/30.png": "afa57373b90a14e1641ae648e23a8af0",
    "assets/assets/24.png": "cac0eb567639c5c426cf970ea4bb1440",
    "assets/assets/25.png": "4f12a65f1e0dd0d823723f47b5d149c6",
    "assets/assets/31.png": "a881363a41fc9b6705f15e87a5de7a87",
    "assets/assets/19.png": "f813dd8cbd1d4d18fa4f5beac72278d0",
    "assets/assets/song4.wav": "41518da2f7207a7054df62f3147008fe",
    "assets/assets/4.png": "bc4df925862772cf967c4b4bb73f79b0",
    "assets/assets/42.png": "6a23015475138c8ee9227b96d3c02341",
    "assets/assets/album1.png": "5e1ee927a1eaa7987c1aa0a81fde168b",
    "assets/assets/43.png": "feff32f768493e7732da4179c4b6c5db",
    "assets/assets/5.png": "ce0a9e98eb349801ad9fadd861e81ae6",
    "assets/assets/41.png": "31aff3b5e2fc654a45e407925123afe2",
    "assets/assets/7.png": "4181fd711bc92127e580006dbefcb745",
    "assets/assets/album2.png": "2dea09993741ef58ef6c3e23183ff7dc",
    "assets/assets/album3.png": "0bd40d2c9061ff6cd4bb10c79e3a207b",
    "assets/assets/6.png": "75ea0a0e2b39c0b23fa4a63daf7ce3e3",
    "assets/assets/40.png": "c985ea84380717b84318f071d2ce2818",
    "assets/assets/44.png": "6ef63d6ebac54cb38f3d690143e08594",
    "assets/assets/2.png": "789f5e874c8f5b4ed02bd8371738e568",
    "assets/assets/50.png": "9e5617b229a2251fb922f83c9163253c",
    "assets/assets/3.png": "fad8b040913816b2ae057fa0a0cb3229",
    "assets/assets/51.png": "0320d28d1e34e5df4f0f20879d814f7e",
    "assets/assets/45.png": "6a380dd3d4b35bb14c076d25f5e59591",
    "assets/assets/53.png": "a01a9552bfca4a2fabdf19d97cf9bbd8",
    "assets/assets/1.png": "c963995eddc436512d9d2e5d128c26da",
    "assets/assets/47.png": "cbe6065fae8a926619b296fb58985299",
    "assets/assets/album4.png": "247ed46e1b681136b163b5674e7bfd59",
    "assets/assets/46.png": "39062478f7efe45c6308af0847a3f5c7",
    "assets/assets/52.png": "1af7e69caa912753ee9ccc998c09ab20",
    "assets/44.png": "6ef63d6ebac54cb38f3d690143e08594",
    "assets/2.png": "789f5e874c8f5b4ed02bd8371738e568",
    "assets/50.png": "9e5617b229a2251fb922f83c9163253c",
    "assets/3.png": "fad8b040913816b2ae057fa0a0cb3229",
    "assets/51.png": "0320d28d1e34e5df4f0f20879d814f7e",
    "assets/45.png": "6a380dd3d4b35bb14c076d25f5e59591",
    "assets/53.png": "a01a9552bfca4a2fabdf19d97cf9bbd8",
    "assets/1.png": "c963995eddc436512d9d2e5d128c26da",
    "assets/47.png": "cbe6065fae8a926619b296fb58985299",
    "assets/album4.png": "247ed46e1b681136b163b5674e7bfd59",
    "assets/46.png": "39062478f7efe45c6308af0847a3f5c7",
    "assets/52.png": "1af7e69caa912753ee9ccc998c09ab20"
};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
    "/spweb/",
    "main.dart.js",
    "index.html",
    "assets/NOTICES",
    "assets/AssetManifest.json",
    "assets/FontManifest.json"
];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
    self.skipWaiting();
    return event.waitUntil(
        caches.open(TEMP).then((cache) => {
            return cache.addAll(
                CORE.map((value) => new Request(value, { 'cache': 'reload' })));
        })
    );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
    return event.waitUntil(async function() {
        try {
            var contentCache = await caches.open(CACHE_NAME);
            var tempCache = await caches.open(TEMP);
            var manifestCache = await caches.open(MANIFEST);
            var manifest = await manifestCache.match('manifest');
            // When there is no prior manifest, clear the entire cache.
            if (!manifest) {
                await caches.delete(CACHE_NAME);
                contentCache = await caches.open(CACHE_NAME);
                for (var request of await tempCache.keys()) {
                    var response = await tempCache.match(request);
                    await contentCache.put(request, response);
                }
                await caches.delete(TEMP);
                // Save the manifest to make future upgrades efficient.
                await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
                return;
            }
            var oldManifest = await manifest.json();
            var origin = self.location.origin;
            for (var request of await contentCache.keys()) {
                var key = request.url.substring(origin.length + 1);
                if (key == "") {
                    key = "/";
                }
                // If a resource from the old manifest is not in the new cache, or if
                // the MD5 sum has changed, delete it. Otherwise the resource is left
                // in the cache and can be reused by the new service worker.
                if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
                    await contentCache.delete(request);
                }
            }
            // Populate the cache with the app shell TEMP files, potentially overwriting
            // cache files preserved above.
            for (var request of await tempCache.keys()) {
                var response = await tempCache.match(request);
                await contentCache.put(request, response);
            }
            await caches.delete(TEMP);
            // Save the manifest to make future upgrades efficient.
            await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
            return;
        } catch (err) {
            // On an unhandled exception the state of the cache cannot be guaranteed.
            console.error('Failed to upgrade service worker: ' + err);
            await caches.delete(CACHE_NAME);
            await caches.delete(TEMP);
            await caches.delete(MANIFEST);
        }
    }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
    if (event.request.method !== 'GET') {
        return;
    }
    var origin = self.location.origin;
    var key = event.request.url.substring(origin.length + 1);
    // Redirect URLs to the index.html
    if (key.indexOf('?v=') != -1) {
        key = key.split('?v=')[0];
    }
    if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
        key = '/';
    }
    // If the URL is not the RESOURCE list then return to signal that the
    // browser should take over.
    if (!RESOURCES[key]) {
        return;
    }
    // If the URL is the index.html, perform an online-first request.
    if (key == '/') {
        return onlineFirst(event);
    }
    event.respondWith(caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.match(event.request).then((response) => {
                // Either respond with the cached resource, or perform a fetch and
                // lazily populate the cache.
                return response || fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        })
    );
});

self.addEventListener('message', (event) => {
    // SkipWaiting can be used to immediately activate a waiting service worker.
    // This will also require a page refresh triggered by the main worker.
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
        return;
    }
    if (event.data === 'downloadOffline') {
        downloadOffline();
        return;
    }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
    var resources = [];
    var contentCache = await caches.open(CACHE_NAME);
    var currentContent = {};
    for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
            key = "/";
        }
        currentContent[key] = true;
    }
    for (var resourceKey of Object.keys(RESOURCES)) {
        if (!currentContent[resourceKey]) {
            resources.push(resourceKey);
        }
    }
    return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
    return event.respondWith(
        fetch(event.request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response.clone());
                return response;
            });
        }).catch((error) => {
            return caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response != null) {
                        return response;
                    }
                    throw error;
                });
            });
        })
    );
}