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

// __dirname ==> where this file is located
// .         ==> where the script is run from
const data = fs.readFileSync(`${__dirname}/../resources/json/sample_01.json`, 'utf-8');

const server = http.createServer((request, response) => {
    const pathName = request.url;

    if (pathName === '/' || pathName === '/overview') end(response, STATUS.OK, TYPE.HTML, 'This is the OVERVIEW');
    else if (pathName === '/product') end(response, STATUS.OK, TYPE.HTML, 'This is the PRODUCT');
    else if (pathName === '/api') end(response, STATUS.OK, TYPE.JSON, data);
    else end(response, STATUS.NOT_FOUND, TYPE.HTML, '404 :: Page not found!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});