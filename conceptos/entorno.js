//Las variables de entorno van en mayusculas
//su valor se puede definir desde consola
//Es recomendable colocar un valor por default usando || (or)
let nombre = process.env.NOMBRE || 'Sin Nombre';
let web = process.env.MI_WEB || 'Sin Web';

console.log(`Hola ${nombre}`);
console.log(`Mi web es ${web}`);

let proceso = process;
console.log(proceso);