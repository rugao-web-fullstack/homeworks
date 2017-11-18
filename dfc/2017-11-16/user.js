function User(event) {
	this.event = event;
	console.log("user: constructor");
}
User.prototype.register = function(username, password) {
	console.log("user: register");
	this.username = username;
	this.password = password;
};
exports.User = User;