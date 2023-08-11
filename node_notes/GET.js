/* Example of a GET request using Axios (Promise based HTTP client)
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



/* Example of a POST request using Axios (Promise based HTTP client)
    - Many ways to perform this task, depends on abstraction level you wish to use */

