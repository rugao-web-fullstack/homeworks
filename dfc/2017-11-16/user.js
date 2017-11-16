function User(e) {
	this.e = e;
	console.log('user:register');
}
User.prototype.register = function(username, pwd, arr) {
	this.username = username;
	this.pwd = pwd;
	this.e.emit('user_register', this, arr);
}
exports.User = User;