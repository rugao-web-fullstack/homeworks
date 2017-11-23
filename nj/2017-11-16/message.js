function Message(event, sockets) {
	//arr 记录用户的用户名，密码，邮箱信息
	this.event = event;
	this.sockets = sockets;
	console.log("message:constructor");
	let self = this;
	this.event.on("user-register", function(socket, user) => {
		console.log("message: on user-register");
		self.onUserRegister(socket, user);
	});
}

Message.prototype.onUserRegister = function(socket, user) {
	for(var i = 0; i < this.sockets.length; i++) {
		let s = this.sockets[i];
		if(s != socket) {
			s.write("user<" + user.name + "> registered\n");
			console.log("user<" + username + "> registered\n");
		} else {
			s.write("You've registered successfully!\n");
		}
	}

};
exports.Message = Message;