var debug = require('debug')('user');
function User(event) {
  this.event = event;
  debug('log'+'User: constructor');
}

User.prototype.register = function (username, password, email) {
  debug('log'+'User: register');
  this.username = username;
  this.password = password;
  this.email = email;
};
exports.User = User;