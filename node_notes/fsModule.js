/*
- One peculiar thing about the fs module is that all the methods are asynchronous by default,
 but they can also work synchronously by appending Sync. 
*/

// EXAMPLE (Asynchronous API w/ Callback):
const fs = require('fs')
fs.rename('Before Json', 'After Json', err => {
    if (err) {
        return console.error(err)
    }
    // finished
});

// EXAMPLE (Synchronous API can be used like this, with a try/catch block to handle errors)
const fs = require('fs')

try {
    fs.renameSync('Before Json', 'After Json');
    // finished
} catch (error) {
    console.error(error)
}

// NOTE FROM ABOVE EXAMPLE: 
/*
- The key difference here is that the execution of your script will block(aka stay waiting) in the second example, 
until the file operation succeeded. 

- You can use promise-based API provided by fs/promises module to avoid using callback-based API, which may cause callback hell.
*/


// EXAMPLE (Callback Hell):
//Read a file and change its content and read it again using callback-based API.
const fs = require('fs');

const fileName = 'User/joe/test.txt';
fs.readFile(fileName, 'utf8', (err, data)=> {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
    const content = 'Some Content';

    fs.writeFile(fileName, content, err2 => {
        if (err2) {
            console.log(err2)
            return;
        }
        console.log('Wrote some content');
        fs.readFile(fileName, 'utf8', (err3, data3) => {
            if (err3) {
                console.log(err3);
                return;
            }
            console.log(data3);
        });
    });
});

// EXAMPLE (Promise-based API)
// doing same as above code, but avoiding callback hell
const fs = require('fs/promises');

async function readWrite() {
    const fileName = '/Users/joe/test.txt';

    try {
        const data = await fs.readFile(fileName, 'utf8');
        console.log(data)
        const content = 'Some text content' 
        
        await fs.writeFile(fileName, content);
        console.log('data wrote success');

        const newData = await fs.readFile(fileName, 'utf-8');
        console.log(newData);

    } catch (error) {
        console.error(error);
    }
}
readWrite();

/* WRITING TO FILE EXAMPLES 
    - FLAGS:
    (r+) open the file for reading and writing
    (w+) open the file for reading and writing, positioning the stream at the beginning of the file. The file is created if it does not exist
    (a) ppen the file for writing, positioning the stream at the end of the file. The file is created if it does not exist
    (a+) open the file for reading and writing, positioning the stream at the end of the file. The file is created if it does not exist
*/
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});

