function User(e) {
	this.e = e;
	console.log('user:register');
}
User.prototype.register = function(username, pwd) {
	this.username = username;
	this.pwd = pwd;
	this.e.emit('user_register', this);
}
exports.User = User;