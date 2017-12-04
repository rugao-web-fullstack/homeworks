const net = require('net');
var debug = require('debug')('log');
const server = net.createServer((socket) => {
  socket.write('请输入你想输入的内容\n');
  socket.on('data', (data) => {
    let closeSocket = Buffer.from('closeSocket\r\n');
    let closeServer = Buffer.from('closeServer\r\n');
    if(Buffer.compare(data, closeSocket)===0){
      socket.end();
    }
    if(Buffer.compare(data, closeServer)===0){
      socket.end();
      server.close();
    }
  });
});
server.listen(process.env.NODE_POST || 8080, () => {
  debug('log:' + 'TCP开启');
});