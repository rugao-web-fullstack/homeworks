var debug = require('debug')('xxx');
const net = require('net');
const StateUser = require('./states/user').User;
const Machine = require('./machine').Machine;

let sockets = [];
let machine = new Machine();

const server = net.createServer(function (socket) {
  sockets.push(socket);
  new StateUser(socket);

  debug('log:' + 'socket connected!');

  machine.process(socket, null);

  socket.on('data', function (data) {
    debug('log:' + data);
    debug('log:' + String(data));
    debug('log:' + 'data received!');
    machine.process(socket, data);
  });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log:' + 'Server started at: ' + port);
});
