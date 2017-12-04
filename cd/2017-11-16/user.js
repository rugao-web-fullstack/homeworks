var debug = require('debug')('xxx');
function User(event) {
  this.event = event;
  debug('log:' +'user: constructor');
}
User.prototype.register = function(username, password, email) {
  debug('log:' +'user: register');
  this.username = username;
  this.password = password;
  this.email = email;
  this.event.emit('user-register', this);
};
exports.User = User;