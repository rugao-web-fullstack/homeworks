function Message(event, sockets) {
	this.event = event;
	this.sockets = sockets;
	let self = this;
	
	
	this.event.on("user-register", function (socket, user) {
		self.onUserRegister(socket, user);
	});
        this.event.on("user-signin", function (socket, user) {
		self.onUserSignin(socket, user);
	});
}

Message.prototype.onUserRegister = function(socket, user) {
	for( var i = 0; i < this.sockets.length; i++) {
		let s = this.sockets[i];
		console.log(s);
		if (s != socket) {
			s.write("user<" + user.username + "> registered\n");
			console.log("user<" + user.username + "> registered\n");
		} else {
			s.write("You've registered successfully!\n");
		}
	}

};
exports.Message = Message;
