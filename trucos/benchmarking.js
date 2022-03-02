//Calcular el tiempo que tarda una operación
let sum = 0;
console.time('Time');
for (let i = 0; i < 100000000; i++) {
    sum = sum + 1;
}
console.timeEnd('Time');
console.log(sum);


//en funciones asincronas
function asyncFunc (){
    return new Promise ((resolve) => {
        setTimeout(function(){
            console.log('End of the async process!');
            resolve();
        }, 4000);
    });
};

console.time('Async');
console.log('Start Async process!');
asyncFunc()
    .then(() => {
        console.timeEnd('Async');
    })
