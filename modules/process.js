//No es necesario llamarlo es global por default
//const process = require('process');

//before the process end
process.on('beforeExit', () => {
    console.log('The process is going to end');
});

//when the process end
process.on('exit', () => {
    console.log('The process has finished...');
    setTimeout(() => {
        //the process is finished
        console.log('This will not execute, the process has ended!')
    }, 0);
});

//if there are uncaught errors
process.on('uncaughtException', (err, origin) =>{
    console.log(origin);
    console.error('Ups we did not catch some errors...');
    console.error(err);
})

//forcing an error
thisFunctionDoesNotExist();

//if there are errors this line does not execute
console.log('I want to be exectuted');