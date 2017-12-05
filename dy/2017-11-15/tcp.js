const net = require('net');
var debug = require('debug')('log');
const server = net.createServer();
server.on('connection', function (socket) {
  debug('log' + 'server to client has builded');
  socket.on('data', function (data) {
    if (data == '0') {
      debug('log' + 'process exited!');
      process.exit();
    } else if (data == '1') {
      socket.end(function () {
        debug('log' + 'tcp server is closed!');	
      });
    }
		
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log' + 'Server started at :' + port);
});
