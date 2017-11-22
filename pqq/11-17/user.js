function User(event) {
	this.event = event;
}
User.prototype.register = function(username, password, email) {
	this.username = username;
	this.password = password;
	this.email = email;
};


User.prototype.signin = function(username, password) {
	this.username = username;
	this.password = password;
};

exports.User = User;
