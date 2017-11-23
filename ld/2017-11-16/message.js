function Message(event, userSockets) {
	//userSockets记录注册用户的用户名，密码以及邮箱
	this.event = event;
	this.userSockets = userSockets;
	let self = this;
	this.event.on("user-register", (userSocket, user) => {
		self.onUserRegister(userSocket, user);
	});
}

Message.prototype.onUserRegister = function(userSocket, user) {
	for (var i = 0; i < this.userSockets.length; i++) {
		let s = this.userSockets[i];
		if (s != userSocket) {
			s.write("This username <" + user.username + "> has been registered\n");
			console.log("This username <" + user.username + "> has been registered\n");
		} else {
			s.write("You've registered successfully!\n");
		}
	}

};
exports.Message = Message;
