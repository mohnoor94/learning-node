const http = require('http');
const fs = require('fs');  // fileSystem

const STATUS = {
    OK: 200,
    NOT_FOUND: 404
};
const TYPE = {
    HTML: 'text/html',
    JSON: 'application/json'
};

const end = (response, statusCode, contentType, message) => {
    response.writeHead(statusCode, {
        'Content-type': contentType
    });
    response.end(`<h1>${message}</h1>`);
};

const resourcesPath = `${__dirname}/../resources/`;
const data = fs.readFileSync(`${resourcesPath}json/sample_01.json`, 'utf-8');
const dataObject = JSON.parse(data);

const overviewTemplate = fs.readFileSync(`${resourcesPath}html/template-overview.html`, 'utf-8');
const cardTemplate = fs.readFileSync(`${resourcesPath}html/template-card.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${resourcesPath}html/template-product.html`, 'utf-8');

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)
        .replace(/{%IMAGE%}/g, product.image)
        .replace(/{%PRICE%}/g, product.price)
        .replace(/{%FROM%}/g, product.from)
        .replace(/{%NUTRIENTS%}/g, product.nutrients)
        .replace(/{%QUANTITY%}/g, product.quantity)
        .replace(/{%DESCRIPTION%}/g, product.description)
        .replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
};

const server = http.createServer((request, response) => {
    const pathName = request.url;

    if (pathName === '/' || pathName === '/overview') {
        const cardsHtml = dataObject
            .map(el => replaceTemplate(cardTemplate, el))
            .join('');

        const output = overviewTemplate.replace('{%PRODUCT_CARDS%}', cardsHtml);

        end(response, STATUS.OK, TYPE.HTML, output);
    } else if (pathName === '/product') end(response, STATUS.OK, TYPE.HTML, 'This is the PRODUCT');
    else if (pathName === '/api') end(response, STATUS.OK, TYPE.JSON, data);
    else end(response, STATUS.NOT_FOUND, TYPE.HTML, '404 :: Page not found!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});