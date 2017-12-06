var debug = require('debug')('xxx');
function User(event) {
  this.event = event;
  debug('log:' +'user: constructor');
}

User.prototype.register = function (username, password, socket) {
  debug('log:' +'user: register');
  this.username = username;
  this.password = password;
  this.socket = socket;
};

exports.User = User;