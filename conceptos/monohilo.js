console.log('Hola mundo!'); //Se ejecuta inmediatamente Event Loop

//Se ejecutará cada 1 segundo el código dentro de setInterval()
//Esto pasa al Thread Pool mientras el Event Loop ejecuta los 
//console.log() que están fuera de setInterval()
let i = 0;
setInterval(() => {
    console.log(i);
    i++;
    if (i === 5){
        let m = i + z;
    }
}, 1000);

console.log('Segunda instrución');//Se ejecuta inmediatamente Event Loop