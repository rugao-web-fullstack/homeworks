function Message(e) {
	this.e = e;
	e.on('user_register', (user) => {
		this.onUserRegister(user);
	})
}
Message.prototype.onUserRegister = function(user) {
	console.log('注册成功！');
}
exports.Message = Message;