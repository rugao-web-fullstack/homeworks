var debug = require('debug')('xxx');

const net = require('net');
const StateUser = require('./states/user').User;
const StateMailer = require('./states/mail').Mail;
const Machine = require('./machine').Machine;
let sockets = [];
const server = net.createServer(function (socket) {
  let machine = new Machine();
  sockets.push(socket);
  new StateUser(socket);
  new StateMailer(socket);
  debug('info'+'socket connected!');
  machine.process(socket, null);
  socket.on('data', function (data) {
    debug('info'+data);
    debug('info'+String(data));
    debug('info'+'data received!');
    machine.process(socket, data);
  });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('info'+'Server started at: ' + port);
});