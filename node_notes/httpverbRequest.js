/* Example of a GET(get data from db) request using Axios (Promise based HTTP client)
    - Many ways to perform this task, depends on abstraction level you wish to use */

const axios = require('axios');

axios
    .get('https://jsonplaceholder.typicode.com/todos/2')
    .then(res => {
        console.log(`statusCode: ${res.status}`);
        response = res.data; // JS Object if response is JSON
        console.log(response["title"]);
        //console.log(res);
      })
    .catch(error => {
        console.error(error);
    });





/* GET request usine Node.js standard lib. */
const https = require('https');

const options = {
    hostname: 'jsonplaceholder.typicode.com', // name of webpage you are requesting from
    port: 443,
    path: '/todos/1',
    method: 'GET',
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.status}`); // undefined

    res.on('data', d => {
        process.stdout.write(d); // sends data to console in JSON format
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();


/* Example of a POST(create new resource(data) for db) request using Axios (Promise based HTTP client)
    - Many ways to perform this task, depends on abstraction level you wish to use */
const https = require('https');

axios
    .post('https://jsonplaceholder.typicode.com/todos', {
        todo: 'Go to the store',
    })
    .then(res => {
        console.log(`Status Code: ${res.status}`);
        console.log(res);
    })
    .catch(error => {
        console.error(error);
    });

 /* POST request usine Node.js standard lib. */
 const https = require('https');

 const data = JSON.stringify({ // serialize JSON to so we can POST (JSON exists as string when transmitted)
    todo: 'Go to the store',
 });

 const option = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/todos',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    },
 };

 const request = https.request(options, res => {
     console.log(`Status Code: ${res.status}`);
     res.on('data', d => {
        process.stdout.write(d);
     });
 });

 request.on('error', error => {
    console.error(error);
 });

 request.write(data)
 request.end();

 // PUT and DELETE verbs use the same mechanics as above examples. Just make sure to change 'options.method' to the verb you wish to use