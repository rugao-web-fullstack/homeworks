var debug = require('debug')('message');
function Message(event, sockts) {
  this.event = event;
  this.sockets = sockts;
  debug('log'+'message:constructor');
  let self = this;
  this.event.on('user-register', function (socket, user) {
    debug('log'+'message: on user-register');
    self.onUserRegister(socket, user);
  });
}

Message.prototype.onUserRegister = function (socket, user) {
  for (var i = 0; i < this.sockets.length; i++) {
    let s = this.sockets[i];
    if (s != socket) {
      s.write('user' + user.username + '>registered\n');
      debug('log'+'user<' + user.username + '>registered\n');
    } else {
      s.write('You\'ve registered successful !\n');
    }
  }
};
exports.Message = Message;
