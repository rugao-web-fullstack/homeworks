const net = require("net");
const EventEmitter = require('events');
const User = require('./user.js').User;
const Message = require('./event_register.js').Message;
const emitter = new EventEmitter();
let sockets = [];
let users = [];
const user = new User(emitter);
const message = new Message(emitter);
const server = net.createServer((socket) => {
	let flag = 0;
	let reg_flag = 1;
	let username = '';
	let pwd = '';
	sockets.push(socket);
	function Show() {
		socket.write("请输入序号执行指令\n");
		socket.write("1.注册\n");
		socket.write("2.打印用户列表\n");
		socket.write("3.退出程序\n");
	}
	Show();
	socket.on('data', (data) => {
		var Data = data.toString().replace(/[\r\n]/g, '');
		console.log(Data);
		if(flag === 0) {
			let cho = parseInt(Data);
			console.log(cho);
			if(cho > 0 && cho < 4) {
				flag = cho;
				if(flag === 1) {
					socket.write("请输入用户名\n");
				} else if(flag === 2) {
					socket.write("用户列表如下：\n");
					for(let i = 0; i < users.length; i++) {
						socket.write(i + 1 + "." + users[i].username + '\n');
					}
					flag = 0;
					Show();
				} else if(flag === 3) {
					socket.end();
				}
			} else {
				socket.write("序号执行指令无效，请重新输入\n");
			}
		} else if(flag === 1) {
			if(reg_flag === 1) {
				username = Data;
				reg_flag = 2;
				socket.write("请输入密码\n");
			} else if(reg_flag === 2) {
				pwd = Data;
				reg_flag = 1;
				user.register(username, pwd);
				users.push({
					'username' : username,
					'pwd' : pwd
				})
				emitter.emit("user-register", socket, users);
				flag = 0;
				socket.write("注册成功\n");
				socket.write("用户名：" + username + "\n密码：" + pwd + "\n");
				Show();
			}
		}
	})
});
server.listen(process.env.NODE_POST || 8080, () => {
	console.log('TCP开启');
});
