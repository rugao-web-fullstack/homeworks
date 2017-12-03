const net = require('net');
var debug = require('debug')('xxx');
const server = net.createServer((socket) => {
  socket.end('Hello from tcp server!\n');
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log:' + 'Server started at:' + port);
});
