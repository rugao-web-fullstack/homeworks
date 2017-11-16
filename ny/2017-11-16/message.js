function Message(event) {
	this.event = event;
	this.event.on("user-register", (user) => {
		this.success(user);
	});
}

Message.prototype.success = function(user) {
	console.log(user.username + " registered successfully!");
};
exports.Message = Message;