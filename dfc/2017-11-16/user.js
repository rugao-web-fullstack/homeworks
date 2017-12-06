function User(event) {
  this.event = event;
}
User.prototype.register = function(username, password) {
  this.username = username;
  this.password = password;
};
exports.User = User;