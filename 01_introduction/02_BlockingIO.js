const fs = require('fs');  // fileSystem
const prePath = './resources/txt/';

// Blocking, synchronous way
const textIn = fs.readFileSync(`${prePath}input.txt`, 'utf-8');
console.log(textIn);


const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync(`${prePath}output.txt`, textOut);
console.log('File written!');