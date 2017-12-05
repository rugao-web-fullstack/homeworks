function Message(event, sockets) {
  var debug = require('debug')('log');
  this.event = event;
  this.sockets = sockets;
  debug('log'+ 'message:constructor');
  //console.log('message:constructor');
  let self = this;
  this.event.on('user-register', function (socket, user) {
    debug('log'+ 'message: on user-register');
    //console.log('message: on user-register');
    self.onUserRegister(socket, user);
  });
}

Message.prototype.onUserRegister = function (socket, user) {
  var debug = require('debug')('log');
  for (var i = 0; i < this.sockets.length; i++) {
    let s = this.sockets[i];
    if (s != socket) {
      s.write('user<' + user.username + '> registered\n');
      debug('log'+ 'user<' + user.username + '> registered\n');
      //console.log('user<' + user.username + '> registered\n');
    } else {
      s.write('You\'ve registered successfully!\n');
    }
  }

};
exports.Message = Message;
