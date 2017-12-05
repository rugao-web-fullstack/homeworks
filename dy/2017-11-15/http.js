const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello!');
});
server.listen(4333);
