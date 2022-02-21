const { exec, spawn } = require('child_process');
const { stdout, stderr } = require('process');

//correr comandos en la consola
//ls -la
/* exec('ls -la', (err, stdout, stderr) => {
    if(err){
        console.error(err);
        return false;
    }
    console.log(stdout);
})

//node modules/console.js
exec('node modules/console.js', (e, stdout, stderr) => {
    if(e){
        console.error(e);
        return false;
    }
    console.log(stdout);
}) */

//spawn
let proceso = spawn('ls', ['-al']);

console.log(proceso.pid);
console.log(proceso.connected);

proceso.stdout.on('data', function(data){
    console.log('Esta muerto?: ', proceso.killed);
    console.log(data.toString());
})

proceso.stderr.on('data', (data) => {
    console.error(`stderr-->: ${data}`);
});

proceso.on('exit', function(){
    console.log('El proceso terminó');
    console.log(proceso.killed);
})