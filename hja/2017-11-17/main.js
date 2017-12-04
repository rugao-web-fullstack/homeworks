const net = require('net');
const StateUser = require('./states/user').User;
const Machine = require('./machine').Machine;
var debug = require('debug')('main');

let sockets = [];
let machine = new Machine();

const server = net.createServer(function (socket) {
  sockets.push(socket);
  new StateUser(socket);

  // console.log('socket connected!');

  machine.process(socket, null);

  socket.on('data', function (data) {
    // console.log(data);
    // console.log(String(data));
    // console.log('data received!');
    machine.process(socket, data);
  });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('Server started at: ' + port);
  // console.log('Server started at: ' + port);
});