const CACHE_NAME_CORE='CACHE-V1';
const   CACHE_FILES_CORE=[

    "src/js/app.js",
    "src/css/app.css",
    "/",
    "src/images/icons/icon-144x144.png",
    "src/images/computer.jpg",
    "/index.html",

];

const CACHE_NAME_DYNAMIC='dynamic-v1';

const CACHE_NAME_INMUTABLE='inmutable-v1';
const CACHE_FILES_INMUTABLE=[
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://code.getmdl.io/1.3.0/material.blue-pink.min.css",
    "https://code.getmdl.io/1.3.0/material.min.js",
    "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://unpkg.com/pwacompat"

];


//cuando se instala
self.addEventListener('install', (event)=>{
    //agregar al cache nuestros archivos
    const guardandoCache=caches.open(CACHE_NAME_CORE)
    .then(cache =>{
        return cache.addAll(CACHE_FILES_CORE);
    })

    const guardandoCacheIn=caches.open(CACHE_NAME_INMUTABLE)
    .then(cache =>{
        return cache.addAll(CACHE_FILES_INMUTABLE);
    })

    self.skipWaiting();
    event.waitUntil(Promise.all([guardandoCache,guardandoCacheIn]));

});


self.addEventListener('active', event =>{
    // borrar la cache vieja

    const obtenerCaches = caches.keys()
    .then(allCaches => allCaches.filter(cache => ![CACHE_NAME_CORE, CACHE_NAME_INMUTABLE, CACHE_NAME_DYNAMIC].includes(cache)).filter(cacheName => caches.delete(cacheName))) 
    .catch(err => console.error(err.message))
  console.info('[SW]: Cache limpiado exitosamente...');
  event.waitUntil(obtenerCaches);

});

//Cuando el sw toma el control de la aplicación

self.addEventListener('activate', event =>{
    // borrar la cache vieja

    console.log('sw: Activo y listo para controlar la app');

});

// escuchar peticiones http
self.addEventListener('fetch',  (event)=>{
    if(!(event.request.url.indexOf('http') === 0)){
        return;
      }

      const cacheAyudaRed = caches.match(event.request)
        .then(page => page || fetch(event.request)
        .then(eventRequest => {
          return caches.open(CACHE_NAME_DYNAMIC).then(cache => {
            if (![].concat(CACHE_FILES_CORE,CACHE_FILES_INMUTABLE).indexOf(event.request.url) || eventRequest.type === 'opaque') {
              cache.put(event.request, eventRequest.clone())
            }
            return eventRequest;
          })
        }));
      event.respondWith(cacheAyudaRed)    
});

//cuando recueramos la conexion

self.addEventListener('sync', event=>{
    console.log('tenemos conexion');
    console.log(event);
    console.log(event.tag);
});




//Manejar las push notifications
self.addEventListener('push', event =>{
    console.log('Notificación recibida');


});

