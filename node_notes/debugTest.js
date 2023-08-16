const fs = require('fs/promises');
const path = require('path');
// const promise = writeFile('message.txt', data, { signal });

async function createWrite() {
    /*
        __dirname refers to current directory of this script
        I.E: ' /Users/jakobsymchych/code/backend_notes/node_notes '
     */
    const filePath = path.join(__dirname, 'example.txt');

    try {
        await fs.writeFile(filePath, "Hello, World!", { flag: 'w+' }, err => {
            if (err) {
                console.error(err);
            }
            console.log('File created and content added asynchronously.');
        });
        
    } catch (error) {
        console.error(error);
    }

};

createWrite();