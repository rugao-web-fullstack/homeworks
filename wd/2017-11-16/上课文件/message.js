function Message(event) {
	this.event = event;
	this.event.on("user-register", (user) => {
		this.mail(user);
	});
}

Message.prototype.mail = function(user) {
	console.log("register success! username is " + user.username);
};
exports.Message = Message;
