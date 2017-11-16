function User(event) {
	this.event = event;
	console.log("user: constructor");
}
User.prototype.register = function(username, password, email) {
	console.log("user: register");
	this.username = username;
	this.password = password;
	this.email = email;
	this.event.emit("user-register", this);
};
exports.User = User;
