function Message(event) {
	this.event = event;
	console.log("message:constructor");
	this.event.on("user-register", (user) => {//监听器，事件触发则执行监听函数
	console.log("message: on user-register");
		this.mail(user);
	});
}

Message.prototype.mail = function(user) {
	console.log("email is sent to <" + user.username + ">" + user.email);
};
exports.Message = Message;
