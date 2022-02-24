let buffer = Buffer.alloc(1); //guarda 1 espacio en memoria
console.log(buffer); //<Buffer 00> buffer vacío


let otherBuffer = Buffer.from([1, 2, 7]);
console.log(otherBuffer); //<Buffer 01 02 07>

let stringBuffer = Buffer.from('Hello world!');
console.log(stringBuffer); //<Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>
console.log(stringBuffer.toString()); //Hello world!

//-----------
let abc = Buffer.alloc(26); //crea un buffer vacio
console.log(abc);
//crear el abecedario
for(let i = 0; i < 26; i++){
    abc[i] = i + 97; //le suma los caracteres ascii codigo hexagesimal
}

console.log(abc); //<Buffer 61 62....7a> //hexagesimal
console.log(abc.toString()); //abcdefghijklmnopqrstuvwxyz