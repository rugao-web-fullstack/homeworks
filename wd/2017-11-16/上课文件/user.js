function User(event) {
	this.event = event;
}
User.prototype.register = function(username, password) {
	this.username = username;
	this.password = password;
	this.event.emit("user-register", this);
};
exports.User = User;
