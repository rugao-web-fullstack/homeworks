const net = require('net');
const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
const emitter = new EventEmitter();

// All sockets connections

let sockets = [];
const user = new User(emitter);
const message = new Message(emitter, sockets);

//每个用户登录弹出的信息
function Interactive(socket) {
	this.socket = socket;
	this.print = function() {
		socket.write("请输入注册用户信息，格式：用户名 密码 电子邮件地址\n");
	}
}

var server = net.createServer(function (socket) {
	// 服务端控制台输出
	// current users = ::ffff:192.168.21.31
	//current users = 0
	console.log("user login from: " + socket.remoteAddress);
	console.log("current users = " + sockets.length);
	sockets.push(socket);
	//客户端输出   Hello to user from ::ffff:192.168.21.31
	socket.write("Hello to user from " + socket.remoteAddress);
	socket.write("\n");
	let ia = new Interactive(socket);
	ia.print();
	socket.on('data', function (data) {
		let message = new String(data);
		console.log("message:" + message);
		let inputs = message.split(" ");
			console.log(inputs);
		if (inputs.length === 3) {
			user.register(inputs[0], inputs[1], inputs[2]);
			let userInfo = {username: inputs[0]};
			emitter.emit("user-register", socket, userInfo);
		}

	});
	//用户退出时删除用户信息
	socket.on('close', function() {
		console.log("client disconnected");
		for(var i = 0; i < sockets.length; i ++) {
			let s = sockets[i];
			if (s === socket) {
				sockets.splice(i, 1);
				console.log("socket removed");
			}
		}
	});
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("Server started at: " + port);
});