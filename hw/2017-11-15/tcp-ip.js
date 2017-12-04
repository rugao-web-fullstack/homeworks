var debug = require('debug')('xxx');
const net = require('net');
const server = net.createServer((socket) => {
  socket.write('Please enter what you want \n');
  socket.on('data', (data) => {
    let Data = data.toString();
    debug('log:' +Data);
    let closeSocket = Buffer.from('closeSocket\r\n');
    let closeServer = Buffer.from('closeServer\r\n');
    if (Buffer.compare(data, closeSocket) === 0) {
      socket.end();
    }
    if (Buffer.compare(data, closeServer) === 0) {
      socket.end();
      server.close();
    }

  });
});
server.listen(process.env.NODE_PORT || 8080, () => {
  debug('log:' +'TCP open');
});
