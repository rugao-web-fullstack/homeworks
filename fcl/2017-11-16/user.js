function User(event) {
  this.event = event;
}
User.prototype.register = function(username, password, email) {
  this.username = username;
  this.password = password;
  this.email = email;
};
exports.User = User;
