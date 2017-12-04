const http = require('http');
var debug = require('debug');
let port = process.env.NODE_PORT || 8080;

http.createServer((req, res) => {
  res.end('Hello world');
}).listen(port, () => {
  debug('Server started at:' + port);
});