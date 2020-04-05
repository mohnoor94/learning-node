const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    const pathName = request.url;
    let message;
    let statusCode = 200; // OK!
    if (pathName === '/' || pathName === '/overview') message = 'This is the OVERVIEW';
    else if (pathName === '/product') message = 'This is the PRODUCT';
    else {
        message = '404 :: Page not found!';
        statusCode = 404; // Not found!
    }

    response.writeHead(statusCode, {
        'Content-type': 'text/html',
        'my-own-header': 'hello-world!'
    });
    response.end(`<h1>${message}</h1>`);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

// start the server (node 01_introduction/05_Routing.js)
// then access the localhost url on port 8000 from your browser to see the result (http://127.0.0.1:8000/)