function hola (nombre){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const saludo = 'Hola ' + nombre;
            resolve(saludo);
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

async function main(){
    let nombre = await hola('Carlos');
    console.log(nombre);
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log('Terminando....');
}

console.log('Iniciando...');
main();
//se ejecutaria antes de main(), porque main() es asincrona
//console.log('Terminandoo...');