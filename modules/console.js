console.log('LOG: hey...');
console.info('INFO: you need more info..');
console.error('ERROR: this is an error...');
console.warn('WARN: pay atention...');

//console.table()
const arr = [
    {
        name: 'Tim',
        age: 12
    },
    {
        name: 'Kim',
        age: 14
    }
]

console.table(arr);
/*
┌─────────┬───────┬─────┐
│ (index) │ name  │ age │
├─────────┼───────┼─────┤
│    0    │ 'Tim' │ 12  │
│    1    │ 'Kim' │ 14  │
└─────────┴───────┴─────┘
*/

//console.group()
console.group('Chat');
console.log('- Hello');
console.log('- Hi, how are you');
console.log('- I am fine');
console.groupEnd('Chat');

console.group('Chat 2');
console.log('- Hi friend');
console.log('- Hi, how are you');
console.log('- I am fine, and you');
console.groupEnd('Chat 2');

//console.count()
console.count('count'); //count: 1
console.count('count'); //count: 2
console.count('count'); //count: 3
console.countReset('count');

console.count('count'); //count: 1
console.count('count'); //count: 2
console.count('count');


setTimeout(() => {
    console.clear();
}, 20000);