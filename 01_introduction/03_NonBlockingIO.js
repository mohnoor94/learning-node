const fs = require('fs');  // fileSystem
const prePath = './resources/txt/';

// Non-blocking, asynchronous way
console.log('#1');
fs.readFile(`${prePath}start.txt`, 'utf-8', (err, data) => {
    console.log(data);
});
console.log('#2');

// Another example (Callback hell)
fs.readFile(`${prePath}start.txt`, 'utf-8', (err, data1) => {
    if (err) return console.log('ERROR!');

    fs.readFile(`${prePath}${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`${prePath}append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile(`${prePath}final.txt`, `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written!');
            })
        });
    });
});
console.log('#3');