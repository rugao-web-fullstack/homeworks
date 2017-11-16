tion Message(e) {
	this.e = e;
	e.on('user_register', (user, arr) => {
		this.onUserRegister(user, arr);
	})
}
Message.prototype.onUserRegister = function(user, arr) {
	arr.push({
		'username': user.username,
		'pwd': user.pwd,
	});
	console.log('注册成功！');
}
exports.Message = Message;