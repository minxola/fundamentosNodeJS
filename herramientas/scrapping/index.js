const puppeteer = require('puppeteer');

(async () => {
    console.log('Opening browser...');

    //headless: false indica que podemos ver el navegador
    //para el caso de test, en producción no sería necesario
    //todo se hace en memoria
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();

    //visitar la página
    await page.goto('https://es.wikipedia.org/wiki/Node.js');

    //sacar un screenshot de la página
    await page.screenshot({ path: 'screenshot.png' });

    //Obtener el título de la página
    var titulo1 = await page.evaluate(() =>{
        const h1 = document.querySelector('h1');
        return h1.innerHTML;
    })

    //Muestra el título de la página
    console.log(titulo1); //Node.js

    console.log('Closing browser...');
    browser.close();
    console.log('Browser closed...');
})();