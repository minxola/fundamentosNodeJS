const http = require('http');

http.createServer(router).listen(3000);
//puertos 3000, 8080, 3001

console.log('Escuchando http en el puerto 3000');

function router(req, res){
    console.log('New request...');
    console.log(req.url);

    switch (req.url) {
        case '/':
            res.write('Hello you are welcome!!!');
            res.end();
            break;
        case '/home':
            res.write('You are at home now');
            res.end();
            break;
        default:
            res.write('Error 404: What are you searching for...');
            res.end();
            break;
    }

/* replaced whit switch...warning!
    //head
    res.writeHead(201, {'Content-Type': 'text/plain'});

    //response
    res.write('El servidor HTTP is running in NodeJS');
    res.end(); */
}