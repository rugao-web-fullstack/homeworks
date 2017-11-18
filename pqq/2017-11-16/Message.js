function Message(event, sockets) {
	this.event = event;
	this.sockets = sockets;
	console.log("message:constructor");
	let self = this;
	this.event.on("user-register", function (socket, user) {
		console.log("message: on user-register");
		self.onUserRegister(socket, user);
	});
}

Message.prototype.onUserRegister = function(socket, user) {
	for( var i = 0; i < this.sockets.length; i++) {
		let s = this.sockets[i];
		if (s != socket) {
			s.write("user<" + user.name + "> registered\n");
			console.log("user<" + user.name + "> registered\n");
		} else {
			s.write("You've registered successfully!\n");
		}
	}

};
exports.Message = Message;