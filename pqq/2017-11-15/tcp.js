const net = require('net');
const server = net.createServer();
var debug = require('debug')('xxx');

server.on('connection', function (socket) {
  debug('服务建立');
  socket.on('data', function (data) {
    if (data == '0') {
      debug('stop');
      process.exit();
    } else if (data == '1') {
      socket.end(function () {
        debug('close');	
      });
    }
		
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('Server started at :' + port);
});