function Message(event,arr) {
//arr 记录用户的用户名，密码，邮箱信息
	this.event = event;
	console.log('创建message对象');
	//事件监听
	this.event.on('register',(user) => {
		console.log('register事件触发');
		var x = this.email(user);
		arr.splice(0,1);
		arr.push(x);
	});
}
Message.prototype.email = function(user){
	var msg = ('用户名:'+user.username+' 密码:'+user.password+' 邮箱:'+user.email);
	return msg;
	
};
exports.Message = Message;
