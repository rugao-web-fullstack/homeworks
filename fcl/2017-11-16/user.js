function User(event) {
	this.event = event;
}
User.prototype.register = function(username, password, email) {
	console.log("user: register");
	this.username = username;
	this.password = password;
	this.email = email;
};
exports.User = User;
