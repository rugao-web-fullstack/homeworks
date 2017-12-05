var debug = require('debug')('log');

function Message(ev, sockets) {
  this.ev = ev;
  this.sockets = sockets;
  debug('log' +'MESSAGE');
  let self = this;
  this.ev.on('user-register', function (socket, user) {
    debug('log' +'message: on user-register');
    self.onUserRegister(socket, user);
  });
}
Message.prototype.onUserRegister = function (socket, user) {
  for (var i = 0; i < this.sockets.length; i++) {
    let s = this.sockets[i];
    if (s != socket) {
      s.write('user <' + user.username + '> registed!');
      debug('log' +'user <' + user.username + '> registed!');
    } else {
      s.write('You\'ve registed successfully!');
    }
  }
};
exports.Message = Message;