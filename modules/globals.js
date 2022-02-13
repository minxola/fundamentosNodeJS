setTimeout(() => {
    console.log('I am a setTimeout...');
}, 2000);

//setInterval and clearInterval
let i = 0;
let inverval = setInterval(callback, 2000);

function callback () {
    console.log('I am a setInterval...' + i);
    if(i === 4){
        clearInterval(inverval);
        console.log('I have been stoped...by clearInterval')
    }
    i++;
}

//Lo primero que se ejecuta en el hilo
console.log('I am a simple console.log...')

//asyncronous setImmediate, se ejecuta después del console.log
//ya que este es síncrono.
setImmediate(()=>{
    console.log('I am a setImmediate...');
})