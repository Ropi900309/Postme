//cuando se instala
self.addEventListener('install', event =>{
    console.log('sw: instalando sw');

    const instalacion=new Promise((resolve,reject)=>{
           setTimeout(()=>{
                 console.log('instalaciones terminadas');
                 self.skipWaiting();
                 resolve();
           },1000);

     });
     
     event.waitUntil( instalacion);

});


//Cuando el sw toma el control de la aplicación

self.addEventListener('activate', event =>{
    // borrar la cache vieja

    console.log('sw: Activo y listo para controlar la app');

});

// escuchar peticiones http
self.addEventListener('fetch', event =>{
 //event.respondWith(fetch(event.request))
 if(event.request.url.includes('main.jpg')){
     event.respondWith(fetch('img/Secuestro.jpg'));
} else{
     event.respondWith(fectch(event.request));
}
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

