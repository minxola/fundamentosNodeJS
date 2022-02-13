//llamado del módulo file system (fs)
const fs = require('fs');

//para leer un archivo
function leer (ruta, callback){
    fs.readFile(ruta, (error, data) => {
        if(error){
            throw error;
        } else{
            console.log('Archivo encontrado....')
        }
        callback(data.toString());
    })
}

leer(__dirname + '/file.txt', console.log);

//escribir un archivo
function escribir (ruta, contenido, cb){
    fs.writeFile(ruta, contenido, function(error){
        if(error){
            console.log('No se pudo escribir', error);
        } else{
            console.log('Se escribió correctamente');
        }
    })
}

escribir(__dirname + '/archivo.txt', 'Soy un archivo nuevo \n', console.log);
escribir(__dirname + '/delete.txt', 'I will be deleted', console.log);

//borrar un archivo
function borrar (ruta, cb){
    fs.unlink(ruta, (error) => {
        if(error){
            console.log('No se pudo borrar', error);
        } else {
            console.log(ruta + ' Se borró correctamente');
        }
    });
}

//Borra el archivo despues de 5 segundos, nos permite ver el archivo
setTimeout(() => {
    borrar(__dirname + '/delete.txt', console.log);
}, 5000);

//añadir texto a un archivo existente
function añadir (ruta, addData, cb){
    fs.appendFile(ruta, addData, (error) =>{
        if (error) throw error;
        console.log('Texto añadido...');
    })
}

añadir(__dirname + '/archivo.txt', 'Texto añadido', console.log);