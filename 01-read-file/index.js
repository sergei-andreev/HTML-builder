const fs = require('fs');
const path = require('path');

const readFile = (pathToFile) => {
    const reader = fs.createReadStream(pathToFile, 'utf-8');
    reader.on('data', (data) => {
        console.log(data);
    });
};

const pathToFile = path.join(__dirname, 'text.txt');
readFile(pathToFile);
