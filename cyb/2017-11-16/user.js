function User(event) {
  this.event = event;
}

User.prototype.register = function (username, password, email) {
  this.username = username;
  this.password = password;
  this.email = email;
  this.event.emit('register', this);
};
exports.User = User;
