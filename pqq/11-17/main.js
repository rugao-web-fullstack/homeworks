const net = require('net');
const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require('events');
const emitter = new EventEmitter();

let sockets = [];
let mingzi = [];
let mima = [];
const user = new User(emitter);
let arrAllSocket = [];
const message = new Message(emitter, sockets);

var server = net.createServer(function(socket) {
	console.log("用户登录IP: " + socket.remoteAddress);
	console.log("目前在线人数 = " + sockets.length);
	sockets.push(socket);
	socket.write("Welcome Mail~~:" + socket.remoteAddress);
//	socket
	socket.write("\nRegister:username password mailAdd");
//	socket.write("Login:username password");
	socket.on('data', function(data) {
		
		let message = new String(data);//进行转码
		console.log("message:" + message);
		let inputs = message.split(" ");
		console.log(inputs[0]);
		console.log(inputs[1]);
		
		if(inputs.length === 3) {
			mingzi.push(inputs[0]);
			mima.push(inputs[1]);
			user.register(inputs[0], inputs[1], inputs[2]);
			let userInfo = {
				username: inputs[0]
			};
			emitter.emit("user-register", socket, userInfo);
		} else if(inputs.length === 2) {
			for(var i = 0; i < mingzi.length; i++) {
				if(inputs[0] === mingzi[i] && inputs[1].trim() === mima[i]) {
					user.signin(inputs[0], inputs[1].trim());
					let userInfo = {
						username: "username",
						password: "password"
					};
					emitter.emit("user-signin", socket, userInfo);
				}
			}
		}

	});

	socket.on('close', function() {
		console.log("连接断开");
		for(var i = 0; i < sockets.length; i++) {
			let s = sockets[i];
			if(s === socket) {
				sockets.splice(i, 1);
				console.log("socket removed");
			}
		}
	});

});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("服务开启在: " + port+'\n');
});