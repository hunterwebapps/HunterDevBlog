"use strict";var precacheConfig=[["/Client/build/index.html","be953375381445ee7d5b530458bdb898"],["/Client/build/static/css/main.4eea0401.css","171090c754ad7a0e7d4dd73ddafdbb8d"],["/Client/build/static/js/main.1739b92b.js","5d2c380b9fd7376d3bddd8027de5ed60"],["/Client/build/static/media/fa-brands-400.6814d0e8.woff2","6814d0e8136d34e313623eb7129d538e"],["/Client/build/static/media/fa-brands-400.83e6c29f.svg","83e6c29fb363b2f0ea6cc18fefff729c"],["/Client/build/static/media/fa-brands-400.da408238.woff","da408238128b876cbda6424391f1566f"],["/Client/build/static/media/fa-brands-400.e8019d50.eot","e8019d507e8cb51d169ab4f94a0cda12"],["/Client/build/static/media/fa-brands-400.fdf44bc4.ttf","fdf44bc43e8fa2358bbb7d9165d78455"],["/Client/build/static/media/fa-regular-400.8d220c79.ttf","8d220c793e2612bd131ed8522c54669f"],["/Client/build/static/media/fa-regular-400.8d9ab84b.woff2","8d9ab84bfe87a3f77112a6698cf639fb"],["/Client/build/static/media/fa-regular-400.ba2a91dc.svg","ba2a91dc95e6cfdc4b2a186a7ba83e29"],["/Client/build/static/media/fa-regular-400.dad90637.woff","dad90637f797356bbc70d2664832e0b6"],["/Client/build/static/media/fa-regular-400.e6c93cb4.eot","e6c93cb47e716b579264a5fdfbf7e84d"],["/Client/build/static/media/fa-solid-900.132e9759.ttf","132e9759d93e4eefd7cdde0d7a322991"],["/Client/build/static/media/fa-solid-900.2d0415fa.woff","2d0415fa29ea596b7a02c78eddeede20"],["/Client/build/static/media/fa-solid-900.b75b4bfe.woff2","b75b4bfe0d58faeced5006c785eaae23"],["/Client/build/static/media/fa-solid-900.de1d242d.svg","de1d242d8acb26ec43c0d071fe78e72d"],["/Client/build/static/media/fa-solid-900.ea363ed4.eot","ea363ed422723673917901680be9b37c"],["/Client/build/static/media/glyphicons-halflings-regular.448c34a5.woff2","448c34a56d699c29117adc64c43affeb"],["/Client/build/static/media/glyphicons-halflings-regular.89889688.svg","89889688147bd7575d6327160d64e760"],["/Client/build/static/media/glyphicons-halflings-regular.e18bbf61.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/Client/build/static/media/glyphicons-halflings-regular.f4769f9b.eot","f4769f9bdb7466be65088239c12046d1"],["/Client/build/static/media/glyphicons-halflings-regular.fa277232.woff","fa2772327f55d8198301fdb8bcfc8158"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var i=new URL(e);return n&&i.pathname.match(n)||(i.search+=(i.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),i.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),i=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),i]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var i="/Client/build/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(i,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});