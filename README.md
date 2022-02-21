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

El objeto `console` nos permite pasar información a la consola y lo podemos usar según el tipo de información que queremos transmitir:

- `console.log()` para pasar cualquier tipo de información a la consola
- `console.info()` para enviar información sobre algo
- `console.error()` para mostrar un error
- `console.warn()` usado para mostrar una advertencia
- `console.count()` para mostrar un contador auto incremental
- `console.countReset()` para reiniciar el contador
- `console.time()` para iniciar un cronómetro en milisegundos
- `console.timeEnd()` para finalizar el cronómetro
- `console.group()` permite agrupar información en la consola
- `console.groupEnd()` finaliza la agrupación
- `console.clear()` para limpiar la consola

### 14. Errores (try / catch)

La declaración **`try...catch`** señala un bloque de instrucciones a intentar (**`try`**), y especifica una respuesta si se produce una excepción (**`catch`**).

```js
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
```

#### Sintaxis

```js
try {
   try_statements
}
[catch (exception_var_1 if condition_1) { // non-standard
   catch_statements_1
}]
...
[catch (exception_var_2) {
   catch_statements_2
}]
[finally {
   finally_statements
}]
```

- `try_statements`

  Las sentencias que serán ejecutadas.

- `catch_statements_1`, `catch_statements_2`

  Sentencias que se ejecutan si una excepción es lanzada en el bloque `try`.

- `exception_var_1`, `exception_var_2`

  Identificador que contiene un objeto de excepcion asociado a la cláusula `catch`.

- `condition_1`

  Una expresión condicional.

- `finally_statements`

  Sentencias que se ejecutan después de que se completa la declaración `try` . Estas sentencias se ejecutan independientemente de si una excepción fue lanzada o capturada.

#### Descripción

La sentencia `try` consiste en un bloque `try` que contiene una o más sentencias. Las llaves `{}` se deben utilizar siempre`,` incluso para una bloques de una sola sentencia. Al menos un bloque `catch` o un bloque `finally` debe estar presente. Esto nos da tres formas posibles para la sentencia `try`:

1. `try...catch`
2. `try...finally`
3. `try...catch...finally`

Un bloque `catch` contiene sentencias que especifican que hacer si una excepción es lanzada en el bloque `try`. Si cualquier sentencia dentro del bloque `try` (o en una funcion llamada desde dentro del bloque `try`) lanza una excepción, el control cambia inmediatamente al bloque `catch` . Si no se lanza ninguna excepcion en el bloque `try`, el bloque `catch` se omite.

La bloque `finally` se ejecuta despues del bloque `try` y el/los bloque(s) `catch` hayan finalizado su ejecución. Éste bloque siempre se ejecuta, independientemente de si una excepción fue lanzada o capturada.

Puede anidar una o más sentencias `try`. Si una sentencia `try` interna no tiene una bloque `catch`, se ejecuta el bloque `catch` de la sentencia `try` que la encierra.

#### Bloques catch condicionales

También se pueden crear "bloques `catch` condicionales", combinando bloques `try...catch` con estructuras `if...else if...else` como estas:

```js
try {
    myroutine();  // puede lanzar tres tipos de excepciones
} catch (e) {
    if (e instanceof TypeError) {
        // sentencias para manejar excepciones TypeError
    } else if (e instanceof RangeError) {
        // sentencias para manejar excepciones RangeError
    } else if (e instanceof EvalError) {
        // sentencias para manejar excepciones EvalError
    } else {
       // sentencias para manejar cualquier excepción no especificada
       logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
}
```

---

Cuando sucede un error y no es manejado adecuadamente en Node.js, la aplicación y posterior ejecución del código se detiene.

Cada hilo funciona de manera independiente, por lo que en funciones asíncronas el error debe ser manejado dentro de las mismas, ya que estas pasarán a resolverse en el **Thread Pool** y el error se mandará desde allí hacia el hilo principal y detendrá la aplicación.

```js
//Capturan el error en una función
function main (){
    return 1 + x;
}

try{
    main();
} catch (err){
    console.error('Algo salio mal...');
    console.error(err.message);
}

//El error es capturado y se propaga hacia la función raíz
function foo (){
    myFunc();
}

function myFunc(){
    return 1 + y;
}

try {
    foo();
} catch (e){
    console.error('HUBO UN ERRO');
    console.error(e.message);
}

//En funciones asincronas se debe hacer try y catch en
//la función asincrona, ya que no pasan directamente al
//hilo principal
function asyncrona (callback){
    setTimeout(function(){
        try {
            return 1 + z;
        } catch (e){
            console.error('Hubo error en la función asíncrona...');
            callback(e);
        }
    }, 1000);
}

try {
    asyncrona(function(err){
        console.log(err.message);
    });
} catch (e){
    console.error('Hubo un error');
    console.error(e);
}
```

### 15. Procesos hijo (child_process)

El módulo de procesos secundarios de Node.js (**child_process**) tiene funciones **spawn** y **exec**, mediante las cuales podemos iniciar un proceso secundario para ejecutar otros programas en el sistema.

La diferencia más significativa entre child_process.spawn y child_process.exec está en lo que spawn devuelve un stream y exec devuelve un buffer.

- Usa **spawn** cuando quieras que el proceso hijo devuelva datos binarios enormes a Node.
- Usa **exec** cuando quieras que el proceso hijo devuelva mensajes de estado simples.
- Usa **spawn** cuando quieras recibir datos desde que el proceso arranca.
- Usa **exec** cuando solo quieras recibir datos al final de la ejecución.

#### exec

```js
const { exec } = require('child_process');

exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

#### spawn (generar)

Ejecutar `ls -lh /usr` y capturar `stdout`, `stderr` y cerrar el proceso:

```js
const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

### 16. Módulos nativos en C++

JavaScript permite hacer uso de módulos nativos de c++. Para lograr esto debemos instalar `sudo npm i -g node-gyp`, este modulo de npm nos permite compilar módulos nativos de c++ en node.

Luego debemos tener listo nuestro archivo de código fuente en c++ junto a otro archivo .gyp, que nos ayudara hacer la compilación a JavaScript.

En este archivo .gyp le indicamos que va compilar, como se va llamar el archivo resultante y de donde va a tomar la info a convertir, todo esto lo dejamos como un json

```json
{
  "targets": [
    {   
      "target_name": "addon",
      "sources": [ "hola.cc" ]
    }
  ]
}
```

luego le decimos a node que configure este modulo, con le comando `node-gyp configure`, como resultado tendremos en un directorio nuevo donde se encontraran diferentes archivos de código nativo, para finalizar con `node-gyp build` creamos nuestro modulo y estará listo para ser usado.

### 17. HTTP

Node nos ofrece el modulo HTTP el cual nos permite principalmente crear un servidor en nuestro computador.
En este modulo encontraremos todo lo necesario que necesitamos para crear un sistema de rutas, que responderá cada ruta, los header que podrá mandar, etc.
Uno de los métodos principales de este modulo es createServer, el cual nos permitirá abrir un puerto para crear el servidor.

```js
const http = require('http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);
```

O también se puede crear de la siguiente forma:

```js
const http = require('http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);

```



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
