# Curso de Fundamentos de Node.js

Por: **Carlos Hernandez**

Redes: [@CodingCarlos]()

[TOC]



## Conocer los conceptos básicos de Node.js

### 1. Instalación de Node.js

[Sitio web: nodejs.org](https://nodejs.org/)

- Descargar la versión según el sistema operativo e instalar siguiendo las instrucciónes.
- Luego en consola:
  - `node -v`, para ver si se instaló correctamente y su versión
  - `npm -v`, para ver la versión de NPM instalado (se instala con Node.js)

### 2. Node: orígenes y filosofía

#### ¿Que es Node.js?

- Es un entorno de ejecución de JavaScript fuera del navegador.
- Se crea en 2009, está orientado a servidores.

#### Fuera del navegador

- No necesita del navegador para ejecutar JavaScript
- Servidores
- Herramientas: transpiladores, scraping, automatización, IoT, etc.

#### Lenguaje concurrente

- Monohilo, con entradas y salidas asíncronas
- Un proceso por cada núcleo del procesador, no es bloqueante

#### Corre sobre el motor V8

- V8, entorno de ejecución de JavaScript creado por Google y libre desde el 2008
- Escrito en C++
- Convierte JavaScript en código máquina en lugar de interpretarlo en tiempo real

#### Funciona en base a módulos

- Todo lo que no sea sintaxis de programación, son módulos.
- Muchos módulos vienen por defecto en el paquete de node.
- Se puede crear módulos propios.

#### Orientado a eventos

- Hay un bucle de eventos que se ejecuta constantemente.
- Puede orientar tu código de forma reactiva.

### 3. Event Loop: asincronía por diseño

<img src="./img/eventLoop.png" alt="Event Loop" style="zoom:120%;" />

#### Event Loop (bucle de eventos)

Un proceso con un bucle que gestiona, de forma asíncrona, todos los eventos de tu aplicación. El bucle no se bloquea, todo lo que se envía se ejecuta.

#### Event Queue (cola de eventos)

Tiene todos los eventos del código, puede ser una función, request, event, etc. El **Event Queue** envía estos eventos al **Event Loop**, el cual resuelve cada evento inmediatamente, en caso no lo pueda resolver inmediatamente lo envía al **Thread Pool**.

#### Thread Pool (grupo de subprocesos)

Aquí se gestionan las operaciones asíncronas, como por ejemplo: DB Ops, files, slow Ops, etc. lo cual permite que el *Event Loop* no se bloquee. El *Thread Pool* abre un hilo por cada operación y esta se ejecutará en un determinado tiempo, mientras el *Event Loop* continua funcionando.

### 4. Monohilo: implicaciones en diseño y seguridad

**Proceso de node:**

1. Va a abrirse un proceso, ese proceso es un proceso de node    
2. Interpreta todo el archivo    
3. Convertirlo a código maquina    
4. Prepara todo lo que necesita para ejecutarse   
5. Se ejecuta    
6. Se cierra el proceso, y termina 

**Desventaja del Monohilo:**

- Si no se manejan bien los errores y uno truena, ya no continua con los procesos posteriores
- Se debe estar pendiente de todo el código y manejar bien los errores

```js
//./conceptos/monohilo.js
console.log('Hola mundo!');

let i = 0;
setInterval(() => {
    console.log(i);
    i++;
    if (i === 5){
        let m = i + z;
    }
}, 1000);

console.log('Segunda instrución');
```

Al ejecutar el código en consola usamos `node ./conceptos/monohilo.js`:

```bash
Hola mundo!
Segunda instrución
0
1
2
3
4
...\monohilo.js:8
        let m = i + z;
                    ^
ReferenceError: z is not defined

```

Observamos que primero se ejecutan los `console.log()`, ya que el `setInterval()`, necesita un tiempo para ejecutarse, por lo que el *Event Loop* funciona de manera asíncrona delegando esta tarea al *Thread Pool*.

Por otro lado, al haber un error, la ejecución del código se detiene justo cuando `i = 5`.

### 5. Configurar las variables de entorno en Node.js

Las variables de entorno sirven para definir parámetros sencillos de configuración de los programas, de modo que éstos puedan ejecutarse en diferentes ambientes sin necesidad de modificar el código fuente de un script.

Son útiles en diversos casos del desarrollo en general, pero muy habituales en el desarrollo web porque en la mayoría de las ocasiones los programas se deben ejecutar en diferentes ordenadores. Por ejemplo, durante la etapa de desarrollo puede que tengamos unas configuraciones de entorno y cuando se ponga el programa en producción éstas cambien.

#### Crear variables de entorno

El módulo principal `process` de Node.js proporciona la propiedad `env` la cual almacena todas las variables de entorno que fueron definidas al momento que empezó el proceso.

El siguiente código corre `app.js` estableciendo `USER_ID` y`USER_KEY`.

```bash
BASHcopy
USER_ID=239482 USER_KEY=foobar node app.js
```

Esto pasará el `USER_ID` como **239482** y el `USER_KEY` como **foobar**. Esto es apropiado para *testing*, sin embargo para *production*, probablemente sea mejor configurar *BASH scripts* para exportar las variables.

> `process` no requiere el uso de "require", porque está automáticamente disponible.

En el siguiente código se accede a las variables de entorno `USER_ID` y`USER_KEY` que fueron establecidas previamente.

```js
JScopy
let userID = process.env.USER_ID // "239482"
let userKey = process.env.USER_KEY // "foobar"
```

De la misma manera se puede acceder a cualquier variable de entorno configurada.

Lo que puede ocurrir es que las variables de entorno no siempre se hayan definido, por lo que es útil que en nuestro programa les asignemos unos valores predeterminados. Esto lo podemos conseguir con un código como este:

```js
JScopy
let userID = process.env.USER_ID || 'defaultUserID'
let userKey = process.env.USER_KEY || 'defaultUserKey'
```

Si en un proyecto de Node.js se tiene muchas variables de entorno, se puede crear un archivo `.env` en el directorio raíz del proyecto, y luego usar el paquete [dotenv](https://www.npmjs.com/package/dotenv) para cargar las variables durante el tiempo de ejecución (runtime).

```bash
BASHcopy
# .env file
USER_ID="239482"
USER_KEY="foobar"
NODE_ENV="development"
```

En el archivo de JavaScript

```js
JScopyrequire('dotenv').config();
process.env.USER_ID // "239482"
process.env.USER_KEY // "foobar"
process.env.NODE_ENV // "development"
```

> También se puede correr el archivo JavaScript con el comando `node -r dotenv/config index.js` si no se quiere importar el paquete en el código.

### 6. Herramientas para ser más felices: Nodemon y PM2

[Nodemon](https://nodemon.io/), herramienta que al detectar cambios en los archivos relacionados, ejecuta el código automáticamente. Se usa en desarrollo.

Para instalar se puede hacer desde bash usando npm: `npm install -g nodemon`

[PM2](https://pm2.keymetrics.io/), para usar en producción. Es una herramienta similar a nodemon, sin embargo tiene otras funcionalidades mas avanzadas. Nos ayuda a administrar y mantener una aplicación 24/7.

Se puede instalar de manera global: `npm install -g pm2`

## Cómo manejar la asincronía

### 7. Callbacks

Una funcion callback es una funcion que es pasada como argumento a otra funcion, para ser llamada(`called back`) en otro momento.
La funcion que recibe como argumento otras funciones es denominada funcion de orden superior (higher-order function), esta contiene la logica correspondiente para ejecutar adecuadamente la funcion callback.

En el siguiente codigo

```javascript
setTimeout(() => {
    console.log('Hello');
}, 1000)
```

`setTimeout` es una higher-order function y tiene un callback function que se ejecutará luego del tiempo indicado.

### 8. Callback Hell: refactorizar o sufrir

Los callback Hell se dan cuando empiezo a pasar una función como parámetro que a su vez llama a otra función como parámetro, y así hasta n.
Una estrategia para trabajar con estas estructuras lógicas tan monolíticas es usar estructuras de control y funciones recursivas.

Las funciones recursivas se llaman así mismas y mediante la estructura de control le digo cuantas veces voy a necesitar llamar la función así misma.

```js
function hola (nombre, callback){
    setTimeout(() => {
        console.log(`Hola ${nombre}...`);
        callback(nombre);
    }, 1000);
}

function adios (nombre, callback){
    setTimeout(() => {
        console.log(`Adios ${nombre}`);
        callback();
    }, 1000);
}

function hablar (callback){
    setTimeout(() => {
        console.log('Bla bla bla...');
        callback();
    }, 1000);
}

//callbackHell
//Queremos ejecutar hablar() varias veces
/*console.log('Iniciando...');
hola('Rem', function(nombre){
    hablar(function(){
        hablar(function(){
            hablar(function(){
                hablar(function(){
                    adios(nombre, function(){
                        console.log('Finalizando');
                    });
                });
            });
        });
    });
}); */

//Solución al callback hell
function conversacion (nombre, veces, callback){
    if(veces > 0){
        hablar(function(){
            conversacion(nombre, --veces, callback);
        })
    } else {
        adios(nombre, callback);
    }

}

console.log('Iniciando....');
hola('Rem', function(nombre){
    conversacion(nombre, 4, function(){
        console.log('Terminado.....');
    })
});
```

### 9. Promesas

Las promesas son una sintaxis mas elegante y legible de realizar callbacks, creando así un código mucho más escalable y entendible para todas las personas.
Una promesa al final no deja de ser un callback, solo que, con la novedad de tener estados, las promesas cuentan con 3 estados, *resuelta*, en *progreso* y en *fallo*.
Para utilizar una promesa solo debemos de instanciar una nueva, una promesa en si es una función que recibe dos parámetros, resolve y reject, que son los dos estados de una promesa.
Utilizamos resolve para retornar el valor deseado cuando una función se ejecute y utilizamos reject para cuando una función retorna un valor no deseado.

```js
New Promise( (resolve, reject) => {
    //code
    if(code === true){
    	resolve(correctValue);
    }else {
    	reject(wrongValue);
    }
});
```

Para poder obtener los valores que retorna una función debemos utilizar su propiedad `.then`, esta propiedad es una función que recibe un callback el cual tendrá como parámetro el valor retornado con resolve o reject.
Siempre que usemos una promesa además de realizar la propiedad `.then` debemos invocar la propiedad `.catch`, la cual es un callback que recibe como parámetro el error ocurrido en caso de haber sucedido uno.

```js
myPromise(‘Parameter’)
	.then( data => console.log(data))
	.catch( err => console.log(err) );
```

### 10. Async / await

Asyn/Await es azucar sintactico, es decir, una forma muy legible y entendible de realizar código, un Async/Await no deja de ser una función asíncrona, la diferencia es que al usar esta sintaxis se podrá ver un código más legible.
Para usar correctamente esta sintaxis usamos Async para declarar una función asíncrona, cuando una función es asíncrona podremos usar dentro de su contexto el Await.
El Await es la manera en que le indicaremos a nuestro código que ha de “esperar” a que el evento al cual le indiquemos. Await es importante para el proceso del código, por ende, para poder seguir ejecutando el proceso espere a que el evento se resuelva y retorne un valor.
Cuando este retorne un valor el código seguirá normalmente.

```js
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

asyncCall();
```

> En informática, el azúcar sintáctico es un término acuñado por Peter J. Landin en 1964 para referirse a los añadidos a la sintaxis de un lenguaje de programación diseñados para hacer algunas construcciones más fáciles de leer o expresar. Esto hace el lenguaje “más dulce” para el uso por programadores: las cosas pueden ser expresadas de una manera más clara, más concisas, o de un modo alternativo que se prefiera, sin afectar a la funcionalidad del programa.

## Entender los módulos del core

### 11. Globals

En el navegador el objeto global es **window**. **this** hace referencia a **windows**.

En Node.js el objeto global es **global**. **this** hace referencia a **global**.

En node tenemos el objeto **global** que contiene los métodos y propiedades básicas que usamos en node.js.

En node `this` es un alias de `global`

Algunos métodos que se incluyen en el objeto **global** son:

- `setTimeout`: ejecuta una función callback después de un tiempo determinado
- `setInterval`: ejecuta una función callback cada cierto tiempo
- `setImmediate`: ejecuta una función callback inmediatamente, como un *setTimeout* con tiempo de 0. Por lo tanto es asíncrona, se ejecutará luego que el hijo esté libre.
- `clearTimeout`: detiene a una función **setTimeout**
- `clearInterval`: detiene a una función **setInterval**

>  En Node.js, cada archivo es tratado como un módulo.

Hay variables en Node.js que pueden parecer globales, pero no lo son, estas variables existen solo en el *scope* del módulo:

- `__dirname` el directorio del módulo
- `__filename` el archivo del módulo
- `exports` hace referencia al exportar el módulo actual
- `module` hace referencia al módulo actual
- `require()` usado para importar módulos, json y otros archivos locales.

### 12. File system

The Node.js file system module allows you to work with the file system on your computer.

To include the File System module, use the `require()` method:

```js
var fs = require('fs');
```

 Common use for the File System module:

- Read files
- Create files
- Update files
- Delete files
- Rename files

#### Read files

The `fs.readFile()` method is used to read files on your computer.

#### Create files

The File System module has methods for creating new files:

- `fs.appendFile()`
- `fs.open()`
- `fs.writeFile()`

The `fs.appendFile()` method appends specified content to a file. If the file does not exist, the file will be created.

```js
var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```



The `fs.open()` method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created.

```js
var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
```



The `fs.writeFile()` method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created.

```js
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```

#### Update files

The File System module has methods for updating files:

- `fs.appendFile()`
- `fs.writeFile()`

The `fs.appendFile()` method appends the specified content at the end of the specified file:

```js
var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
```

The `fs.writeFile()` method replaces the specified file and content:

```js
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});
```

#### Delete files

To delete a file with the File System module, use the `fs.unlink()` method.

The `fs.unlink()` method deletes the specified file:

```js
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
```

#### Rename files

To rename a file with the File System module, use the `fs.rename()` method.

The `fs.rename()` method renames the specified file:

```js
var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});
```

### 13. Console

### 14. Errores (try / catch)

### 15. Procesos hijo

### 16. Módulos nativos en C++

### 17. HTTP

### 18. OS

### 19. Process

## Utilizar los módulos y paquetes externos

### 20. Gestión de paquetes: NPM y package.json

### 21. Construyendo módulos: require e import

### 22. Módulos útiles

### 23. Datos almacenados vs en memoria

### 24. Buffers

### 25. Streams

## Conocer trucos que no quieren que sepas

### 26. Benchmarking (console time y timeEnd)

### 27. Debugger

### 28. Error First Callbacks

## Manejar herramientas con Node

### 29. Scraping

### 30. Automatización de procesos

### 31. Aplicaciones de escritorio
