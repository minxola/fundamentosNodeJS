const bcrypt = require('bcrypt');

const password = '123456';
let r;


bcrypt.hash(password, 5, function(err, hash){
    console.log(hash);

    bcrypt.compare(password, hash, function(err, res){
        console.log(res);
    })
    const rounds = bcrypt.getRounds(hash);
    console.log(rounds);
})

