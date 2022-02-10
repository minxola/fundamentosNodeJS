function hola (nombre){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Hola ${nombre}...`);
            resolve(nombre);
            reject('Hubo un error...')
        }, 1000);
    });

}

function adios (nombre){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Adios ${nombre}`);
            resolve();
        }, 1000);
    })

}

function hablar (nombre){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Bla bla bla...');
            resolve(nombre);
        }, 1000);
    });
}

console.log('Iniciando...');
hola('Carlos')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then(() => {console.log('Finalizando...')})
    .catch((error) => {
        console.error(error);
    })