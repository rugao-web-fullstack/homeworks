const net = require('net');
const StateUser = require('./user').User;
const Machine = require('./machine').Machine;
const StateMailer = require('./mail').Mail;
let sockets = [];
var debug = require('debug')('log');
const server = net.createServer(function(socket) {
  let machine = new Machine();
  sockets.push(socket);
  //获得用户
  new StateUser(socket);
  new StateMailer(socket);
  //not login
  machine.process(socket, null);
  socket.on('data', function(data) {
    machine.process(socket, data);
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log:' + 'Server started at: ' + port);
});
