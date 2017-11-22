let states = require("./states").states; //状态

function Machine() {
	this.state = states.USER_NOT_LOGIN;
	this.action = '';
}

//用来进行状态的判断，继而进行不同事件
Machine.prototype.process = function(socket, data) {
	let input = this.getCleanedString(data); //转化处理后的数据
	switch(this.state) {
		case states.USER_NOT_LOGIN: //用户未登录
		case states.USER_LOGIN:
			socket.emit(states.USER_LOGIN, this, socket, data);
			break;
		case states.MAIL_WRITE:
			socket.emit(states.MAIL_WRITE, this, socket, data);
			break;
		case srates.MAIL_READ:
			socket.emit(states.MAIL_READ, this, socket, data);
		default:
			socket.emit(states.USER_NOT_LOGIN, this, socket, data);
	}
};

Machine.prototype.getCleanedString = function(socket, data) {
	let input = String(data);
	input = input.replace(/(\n|\r)+$/, ''); //备注：\r回车符 \n（newline）新的一行
	return input;
}

exports.Machine = Machine;