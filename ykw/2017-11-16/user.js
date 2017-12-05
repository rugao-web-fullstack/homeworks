function User(event) {
  var debug = require('debug')('log');
  this.event = event;
  debug('log'+ 'user: constructor');
  //console.log('user: constructor');
}
User.prototype.register = function (username, password, email) {
  var debug = require('debug')('log');
  debug('log'+ 'user: register');
  //console.log('user: register');
  this.username = username;
  this.password = password;
  this.email = email;
};
exports.User = User;
