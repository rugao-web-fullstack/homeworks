const net = require('net');
const User = require("./user").User;
const Message = require("./message").Message;
const EventEmitter = require("events");
const emitter = new EventEmitter();

let sockets = [];
const user = new User(emitter);
const message = new Message(emitter, sockets);

function req(socket) {
	this.socket = socket;
	this.print = function() {
		socket.write("请输入用户名密码和邮箱，用空格隔开\n");
	}
}

var server = net.createServer((socket) => {
	sockets.push(socket);
	let request = new req(socket);
	request.print();
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
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("服务端口: " + port +" 开启");
});

