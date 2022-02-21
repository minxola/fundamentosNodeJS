const os = require('os');

//tipo de arquitectura
console.log(os.arch());

//plataforma: android, windows, linux, etc
console.log(os.platform());

//cpus
const cpus = os.cpus();
console.log('Tengo : ' + cpus.length + ' cpus');

console.table(os.cpus());

//system signals
console.log(os.constants.priority);

//free memory
const SIZE = 1024;
let bytes = os.freemem();
function kb(bytes){return bytes / SIZE};
function mg(bytes){return kb(bytes) / SIZE};
function gb(bytes){return mg(bytes) / SIZE};
console.log(bytes);
console.log(kb(bytes));
console.log(mg(bytes));
console.log(gb(bytes));

//total memory
console.log(`Total memory: ${gb(os.totalmem())}`);

//root user directory
console.log(`Home dir: ${os.homedir()}`);

//temp dir
console.log(`Temp dir: ${os.tmpdir()}`);

//hostname in servers
console.log(`Hostname: ${os.hostname()}`);

//network interfaces
console.log(os.networkInterfaces());