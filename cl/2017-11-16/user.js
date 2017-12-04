var debug = require('debug')('xxx');
function User(event) {
  this.event = event;
  debug('info'+'user: constructor');
}
User.prototype.register = function(username, password, email) {
  debug('info'+'user: register');
  this.username = username;
  this.password = password;
  this.email = email;
};
exports.User = User;