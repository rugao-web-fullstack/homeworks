let states = require("../states").states;
const UserManager = require("../entities/user").User;
var debug = require("debug")("xxx");
function User(socket) {
	socket.on(states.USER_NOT_LOGIN,
		(machine, socket, data) => {
			this.stateNotLogin(machine, socket, data);
		});
	socket.on(states.USER_LOGIN,
		(machine, socket, data) => {
			this.stateLogin(machine, socket, data);
		});
}
//用户未登录
User.prototype.stateNotLogin = function (machine, socket, data) {
	debug("log:" + "inside not login");
	if (!machine.action) {
		this.notLoginHome(machine, socket, data);
	} else {
		switch (machine.action) {
		case "register":
			this.register(machine, socket, data);
			break;
		case "login":
			this.login(machine, socket, data);
			break;
		case "wait":
			this.notLoginWait(machine, socket, data);
			break;
		}
	}
};



User.prototype.notLoginHome = function (machine, socket, data) {
	debug("log:" + "state write");
	socket.write("欢迎来到XXX邮件系统！请选择:\n\t1.用户注册\n\t2.用户登录\n");
	machine.action = "wait";
};

User.prototype.notLoginWait = function (machine, socket, data) {
	let input = machine.getCleanedString(socket, data);
	switch (input) {
	case "1":
		this.registerWait(machine, socket, data);
		break;
	case "2":
		this.loginWait(machine, socket, data);
		break;
	default:
		socket.write("请重新输入：\n");
		this.notLoginHome(machine, socket, data);
		break;
	}
};

User.prototype.registerWait = function (machine, socket, data) {
	socket.write("\n请输入注册邮箱和密码，格式： 邮箱 密码\n");
	machine.action = "register";
};

User.prototype.loginWait = function (machine, socket, data) {
	socket.write("\n请输入登录邮箱和密码，格式： 邮箱 密码\n");
	machine.action = "login";
};


User.prototype.register = function (machine, socket, data) {
	let input = machine.getCleanedString(socket, data);
	input = input.split(" ");
	if (input.length === 2) {
		// User Register
		if (UserManager.register(socket, input[0], input[1])) {
			socket.write("\n注册成功！\n");
			this.loginWait(machine, socket, data);
		} else {
			socket.write("\n用户已经存在！\n");
		}
	} else {
		socket.write("输入错误!");
	}
};

User.prototype.login = function (machine, socket, data) {
	let input = machine.getCleanedString(socket, data);
	input = input.split(" ");
	if (input.length === 2) {
		// User Register
		if (UserManager.login(socket, input[0], input[1])) {
			socket.write("\n登录成功！\n");
			machine.state = states.USER_LOGIN;
			machine.action = "";
			machine.process(socket, data);
			// socket.emit(states.USER_LOGIN, state, socket, null);
		} else {
			socket.write("\n用户名或者密码不匹配！\n");
		}
	} else {
		socket.write("输入错误!");
	}
};

//用户已经登录
User.prototype.stateLogin = function (machine, socket, data) {
	if (!machine.action) {
		this.loginHome(machine, socket, data);
	} else {
		switch (machine.action) {
		case "wait":
			this.homeWaite(machine, socket, data);
			break;
		}
	}
};

User.prototype.loginHome = function (machine, socket, data) {
	socket.write("\n你已经成功登录邮件系统\n\t1.编写邮件\n\t2.查看邮件\n请输入：");
	machine.action = "wait";
};
User.prototype.homeWaite = function (machine, socket, data) {
	let input = machine.getCleanedString(socket, data);
	switch (input) {
	case "1":
		socket.write("mail write");
		machine.state = states.MAIL_WRITE;
		machine.action = "";
		machine.process(socket, data);
		// socket.emit(states.MAIL_WRITE, machine, socket, data);
		break;
	case "2":
		socket.write("mail read");
		machine.state = states.MAIL_READ;
		machine.action = "";
		machine.process(socket, data);
		// socket.emit(states.MAIL_READ, machine, socket, data);
		break;
	default:
		socket.write("请重新输入：\n");
		this.loginHome(machine, socket, data);
		break;
	}
};

exports.User = User;