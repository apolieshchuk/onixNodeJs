const http = require('http');

//port
const PORT = 1111;

// Request options
const options = {
  port: PORT,
  host: 'localhost',
};

//request
http.get(options, (res) => {

  console.log('Response get with status: ' + res.statusCode);

  let data = '';
  res.on('data', chunk => data += chunk);

  // The whole response has been received. Print out the result.
  res.on('end', () => console.log(data));
})
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });