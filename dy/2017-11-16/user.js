var debug = require('debug')('log');

function User(ev) {
  this.ev = ev;
  debug('log' + 'USER');
}
User.prototype.register = function (username, password, email) {
  debug('log' + 'USER REGISTER');
  this.username = username;
  this.password = password;
  this.email = email;
};
exports.User = User;