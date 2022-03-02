const fs = require('fs');
const stream = require('stream');
const util = require('util');

let data = '';

let readableStream = fs.createReadStream(__dirname + '/input.txt');

readableStream.setEncoding('utf-8');

/* readableStream.on('data', function(chunk){
    data = data + chunk;
})

readableStream.on('end', function(){
    console.log(data);
}) */

//------
/* process.stdout.write('hola');
process.stdout.write('que');
process.stdout.write('tal'); */

//-------
const transform = stream.Transform;
function Mayus(){
    transform.call(this);
}
util.inherits(Mayus, transform);

Mayus.prototype._transform = function (chunk, codif, cb){
    chunMayus = chunk.toString().toUpperCase();
    this.push(chunMayus);
    cb();
}

let mayus = new Mayus();

readableStream
    .pipe(mayus)
    .pipe(process.stdout);