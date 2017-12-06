const net = require('net');
const User = require('./user').User;
const EventEmitter = require('events');
const emitter = new EventEmitter();
var debug = require('debug')('log');

let sockets = [];
const user = new User(emitter);

function Interactive(socket) {
  this.socket = socket;
  this.print = function () {
    socket.write('请输入用户注册信息，格式为：姓名 密码 邮箱\n');
  };
}

var server = net.createServer(function (socket) {
  debug('log' + 'user login from: ' + socket.remoteAddress);
  debug('log' + 'current users = ' + sockets.length);
  sockets.push(socket);
  socket.write('Hello to user from ' + socket.remoteAddress);
  socket.write('\n');
  let ia = new Interactive(socket);
  ia.print();
  socket.on('data', function (data) {
    let message = new String(data);
    debug('log' + 'message:' + message);
    let inputs = message.split(' ');
    debug('log' + inputs);
    if (inputs.length === 3) {
      user.register(inputs[0], inputs[1], inputs[2]);
      let userInfo = {username: inputs[0]};
      emitter.emit('user-register', socket, userInfo);
    }
  });
  socket.on('close', function() {
    debug('log' + 'client disconnected');
    for(var i = 0; i < sockets.length; i ++) {
      let s = sockets[i];
      if (s === socket) {
        sockets.splice(i, 1);
        debug('log' + 'socket removed');
      }
    }
  });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  debug('log' + 'Server started at: ' + port);
});