/* //Capturan el error en una función
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
 */
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
        console.log(err.name + ': ' + err.message);
    });
} catch (e){
    console.error('Hubo un error');
    console.error(e);
}