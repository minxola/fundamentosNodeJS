function saludar (name, callback){
    setTimeout(() => {
        console.log('Iniciando el proceso...');
        callback(name);
    }, 1000);
}

function hola (name, callback){
    setTimeout(() => {
        console.log(`Hola ${name}`);
        callback(name);
    }, 1000);
}

function adios (name, callback){
    setTimeout(() => {
        console.log(`Adios ${name}`)
        callback();
    }, 1000);
}

function end (){
    setTimeout(() => {
        console.log('Terminando proceso...')
    }, 1000);
}

let nombre = 'Rem';
saludar(nombre, () => {
    hola(nombre, () =>{
        adios(nombre, end);
    })
});

