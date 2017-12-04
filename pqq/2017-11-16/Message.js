var debug = require('debug')('xxx');

function Message(event, sockets) {
  this.event = event;
  this.sockets = sockets;
  debug('message:constructor');
  let self = this;
  this.event.on('user-register', function (socket, user) {
    debug('message: on user-register');
    self.onUserRegister(socket, user);
  });
}

Message.prototype.onUserRegister = function(socket, user) {
  for( var i = 0; i < this.sockets.length; i++) {
    let s = this.sockets[i];
    if (s != socket) {
      s.write('user<' + user.name + '> registered\n');
      debug('user<' + user.name + '> registered\n');
    } else {
      s.write('You\'ve registered successfully!\n');
    }
  }

};
exports.Message = Message;