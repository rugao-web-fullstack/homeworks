var debug = require('debug')('log');
const net = require('net');
const server = net.createServer((socket) => {
  socket.write('输入close断开服务器\n');
  socket.on('data', (data) => {
    if (data == 'close') {
      socket.end('与服务器断开连接');
      process.exit();
    }
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log:' + 'Server started at' + port);
});
