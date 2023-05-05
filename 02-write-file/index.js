const { createWriteStream } = require('fs');
const path = require('path');
const { createInterface } = require('readline');
const { stdin: input, stdout: output, exit } = require('process');

const writeFile = (pathToFile) => {
    const rl = createInterface({
        input,
        output,
    });

    const writer = createWriteStream(pathToFile, 'utf-8');

    console.log('Please enter text:');
    rl.prompt();

    rl.on('line', (text) => {
        if (text === 'exit') {
            rl.close();
            return;
        }

        writer.write(`${text}\n`);
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('Text saved! Goodbye :)');
        exit();
    });
};

const pathToFile = path.join(__dirname, 'text.txt');
writeFile(pathToFile);
