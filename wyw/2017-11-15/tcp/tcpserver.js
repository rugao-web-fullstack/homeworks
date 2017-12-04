const net = require('net');
var debug = require('debug')('tcpserver');
const server = net.createServer((socket) => {
  socket.write('与服务器连接成功\n');
  socket.write('输入close断开连接\n');
  socket.write('输入closeserver关闭服务器\n');
  socket.on('data', (data) => {
    if (data == 'close') {
      socket.end('与服务器断开连接\n');
    }
    if (data == 'closeserver') {
      socket.end('服务器已关闭\n');
      process.exit();
    }
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log'+'Srever start at :' + port);
});
