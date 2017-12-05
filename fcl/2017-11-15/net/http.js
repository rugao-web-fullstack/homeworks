var debug = require('debug')('log');
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('hello');
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log:' + 'Server started at' + port);
});
