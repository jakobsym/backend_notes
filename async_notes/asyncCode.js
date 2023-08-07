/* Example of a Callback function */
let myNum = undefined;
let fs = require('fs');
const { resolve } = require('path');

function addOne(callback) {
    // 'readFile() runs async, thus nothing executed below until it finishes.
    fs.readFile('number.txt', function doneRead(err, fileContents) {
        myNum = parseInt(fileContents);
        myNum++;
        callback();
    })
}
/* This code will not run until callback() is executed in above code */
function logOutput() {
    console.log(myNum);
}

addOne(logOutput);

/* 'Promise' example */
const getData = function() {
    // go fetch data from some API...
    // clean it up a bit and return it as an object:
    return data
}

const myData = getData() // if this is refactored to return a Promise...

myData.then(function(data){ // .then() tells it to wait until the promise is resolved
  const pieceOfData = data['whatever'] // and THEN run the function inside
})


/* Async/Await Examples: */

// Example below utilizes 'Promise(s)' and does NOT use async/await
function doubleAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x * 2);
        }, 2000);
    });
}


// Running multiple values through function
// e/a 'x' value needs to wait 2 seconds before its Promise can be resolved

//  -> Create a Promise Chain to resolve this issue
function addPromise(x) {
    return new Promise(resolve => {
        doubleAfter2Seconds(10).then((a) => {           // gets 'a' after 'x'
            doubleAfter2Seconds(20).then((b) => {       // gets 'b' after 'a'
                doubleAfter2Seconds(30).then((c) => {   // gets 'c' after 'b'
                    resolve(x + a + b + c);             // sum of all after promise(s) resolved
                })
            })
        });
    });
}

addPromise(5).then((sum) => {   // need 'then()'
    console.log(sum);
});

// Rewriting above code with Async/Await:
// This code does the same as the Promise Chain code above
async function addSync(x) {
    const a = await doubleAfter2Seconds(10);
    const b = await doubleAfter2Seconds(20);
    const c = await doubleAfter2Seconds(30);

    return (x + a + b + c);
}

addSync(5).then((sum) => {
    console.log(sum); // >> (5 + 10 + 20 + 30) = 65
});


/* EXERCISES 

    - Rewrite code snippet using Async/Await instead 
*/
function loadJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        });
}

// SOLUTION
async function loadJson(url) {
    try {
        const response = await fetch(url);
        if (response.status == 200) {
            return await response.json();
        }
    } catch (error) {
        throw new Error(response.status)        
    }
}
loadJson("http://someurlwithapikey.com");


/* EXERCIES CONT.
    - We have a “regular” function called f. 
    How can you call the async function wait() and use its result inside of f?
*/
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
}

function f() {
    // ...what should you write here?
    // we need to call async wait() and wait to get 10
    // remember, we can't use "await"
}


/* SOLUTION */
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
  }

  // simply use .then() to wait for Promise of other function to be resolved
  function f() {
    wait().then(result => alert(result));
  }
  f();