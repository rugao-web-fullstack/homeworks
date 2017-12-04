function User(event) {
  this.event = event;
}

User.prototype.register = function (username, password, socket) {
  this.username = username;
  this.password = password;
  this.socket = socket;
};
exports.User = User;
