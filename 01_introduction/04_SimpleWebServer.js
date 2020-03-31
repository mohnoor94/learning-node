const http = require('http');

const server = http.createServer((request, response) => {
    response.end('Hello from the server!!');
});

server.listen(8000, '127.0.0.1', () => {
   console.log('Listening to requests on port 8000');
});

// start the server (node 01_introduction/04_SimpleWebServer.js)
// then access the localhost url on port 8000 from your browser to see the result (http://127.0.0.1:8000/)