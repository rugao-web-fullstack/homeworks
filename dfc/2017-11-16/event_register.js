function Register(e) {
	this.e = e;
	e.on('user_register', (user, arr) => {
		this.inputUser(user, arr);
	})
}
Register.prototype.inputUser = function(user, arr) {
	arr.push({
		'username': user.username,
		'pwd': user.pwd,
	});
	console.log('注册成功！');
}
exports.Register = Register;