const net = require('net');
var debug = require('debug');
const server = net.createServer((socket) => {
  socket.end('Hello from tcp server!\n');
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('Server started at:' + port);
});