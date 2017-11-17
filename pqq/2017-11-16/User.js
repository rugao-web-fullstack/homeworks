//模块---外部调用
function User(event){
	this.event=event;
	console.log('用户请求注册');
}

User.prototype.register=function(name,pwd,email){
	this.name=name;
	this.pwd=pwd;
	this.email=email;
};

//抛出模块
exports.User = User;

