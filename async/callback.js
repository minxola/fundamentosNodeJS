function saludar (name, callback){
    console.time('Time:');
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
        console.timeEnd('Time:');
    }, 1000);
}

let nombre = 'Karen';
saludar(nombre, () => {
    hola(nombre, () =>{
        adios(nombre, end);
    })
});

