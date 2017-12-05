var debug = require('debug')('gq');
const net = require('net');
let port = process.env.NODE_PORT || 8080;
const server = net.createServer((socket) => {
  socket.write('sucess！\n');
  socket.write('close!\n');
  socket.write('closeServer!\n');
  socket.on('data', (data) => {
    if(data == 'close'){
      socket.end('断开与服务器连接！/n');
    }
    if(data == 'closeServer'){
      socket.end('服务器已关闭！/n');
      process.exit();
    }
  });
	
});
server.listen(port, () => {
  debug('服务器正在监听' +  port + '端口');
});	
