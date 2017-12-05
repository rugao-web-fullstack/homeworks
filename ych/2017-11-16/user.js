var debug = require('debug')('user');
function User(event) {
  this.event = event;
  debug('user: constructor');
}
User.prototype.register = function (username, password, email) {
  debug('user: register');
  this.username = username;
  this.password = password;
  this.email = email;
};
exports.User = User;
