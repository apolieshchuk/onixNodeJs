const http = require('http');

//port
const PORT = 1111;

// server
const server = http.createServer((req, res) => {
  console.log('Get request on server!');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello from Toha-HTTP server!!!!\n');
  res.end();
});

// run in port
server.listen(PORT);