const net = require('net');
const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
const emitter = new EventEmitter();

// All sockets connections

let sockets = [];
const user = new User(emitter);
const message = new Message(emitter, sockets);


function Interactive(socket) {
	this.socket = socket;
	this.print = function() {
		socket.write("请输入注册用户信息，格式：用户名 密码 电子邮件地址\n");
	}
}

var server = net.createServer(function (socket) {
	console.log("user login from: " + socket.remoteAddress);
	console.log("current users = " + sockets.length);
	sockets.push(socket);
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

