const net = require('net');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const User = require('./user').User;
const Mail = require('./mail').Mail;
const Message = require('./message').Message;
const mail = new Mail(emitter); //初始化
const message = new Message(emitter);

//创建一个指令列表
let commands = [{
		act: 'register',
		des: '注册账号\n',
		msg: '请输入您想注册的账号和密码，并以‘ ’隔开:\n'
	},
	{
		act: 'login',
		des: '登录账号\n',
		msg: '请输入您的账号和密码，并以‘ ’隔开：\n'
	},
	{
		act: 'send',
		des: '发送邮件\n',
		msg: '请输入收件人用户名、邮件主题、邮件内容，并以‘ ’隔开:\n'
	},
	{
		act: 'read',
		des: '读取邮件\n',
		msg: '您收取的邮件列表如下：（输入邮件序列号可打开具体邮件）\n'
	},
	{
		act: 'close',
		des: '退出\n',
		msg: '退出当前邮件系统\n'
	},
	{
		act: 'logout',
		des: '退出当前账号\n',
		msg: '退出当前账号，暂为未登录状态\n'
	}
];

let users = []; //注册用户信息
let sockets = []; //登录用户信息
let usermails = []; //邮件列表

const server = net.createServer((socket) => {
	let flag = 0;
	let username = '';
	sockets.push(socket);
	socket.write('欢迎使用xxxx邮件系统！\n');
	socket.write('请先输入help，查看提示帮助！\n');
	socket.on('data', (data) => {
		var Data = data.toString().replace(/[\r\n]/g, '');
		let inputs = '';
		if(flag === 0) {
			switch(Data) {
				case 'help':
					console.log('help');
					for(let i = 0; i < commands.length; i++) {
						socket.write(commands[i].act + ':\t' + commands[i].des);
					}
					socket.write('\n');
					break;
				case 'register':
					socket.write(commands[0].msg);
					flag = 1;
					break;
				case 'login':
					if(username === '') {
						socket.write(commands[1].msg);
						flag = 2;
					} else {
						socket.write('您当前为已登录状态，若要登录其他账号，请先退出当前账号\n');
					}
					break;
				case 'send':
					if(username === '') {
						socket.write('您当前为未登录状态，请先登录后再发送邮件\n');
					} else {
						socket.write(commands[2].msg);
						flag = 3;
					}
					break;
				case 'read':
					if(username === '') {
						socket.write('您当前为未登录状态，请先登录后再读取邮件\n');
					} else {
						socket.write(commands[3].msg);
						emitter.emit('read_mails', findUser(username), usermails);
						flag = 4;
					}
					break;
				case 'close':
					socket.write(commands[4].msg);
					socket.end();
					break;
				case 'logout':
					socket.write(commands[5].msg);
					findUser(username).socket = '';
					username = '';
					break;
				default:
					socket.write(Data + '不是有效指令，可键入help来查看提示！\n');
					break;
			}
		} else {
			switch(flag) {
				case 1:
					let register_flag = true;
					inputs = Data.split(' ');
					if(inputs.length === 2) {
						let user = new User(emitter);
						user.register(inputs[0], inputs[1], socket);
						if(findUser(username)) {
							emitter.emit("user_register", socket, false);
							register_flag = false;
						}
						if(register_flag) {
							emitter.emit("user_register", socket, true);
							console.log(user.username + '用户注册成功！\n');
							users.push(user);
							username = inputs[0];
							flag = 0;
							if(username !== '') {
								socket.write(username + '欢迎回来！' + '\n');
							}
						}
					} else {
						socket.write('输入内容有误，请重新输入！\n');
					}
					break;
				case 2:
					let login_flag = true;
					inputs = Data.split(' ');
					if(inputs.length === 2) {
						let user = new User(emitter);
						user.register(inputs[0], inputs[1], socket);
						if(findUser(inputs[0])) {
							UpdateUser = findUser(inputs[0]);
							if(UpdateUser.password === user.password) {
								username = user.username;
								UpdateUser.socket = socket;
								emitter.emit("user_login", socket, true);
								login_flag = false;
								flag = 0;
							} else {
								emitter.emit("user_login", socket, false);
								login_flag = true;
							}

						}
						if(login_flag) {
							socket.write('该账号不存在，请检查后重新输入！\n');
						}
					} else {
						socket.write('输入内容有误，请重新输入！\n');
					}
					break;
				case 3:
					let send_flag = true;
					inputs = Data.split(' ');
					if(inputs.length === 3) {
						emitter.emit("send_mails", findUser(inputs[0]), username, inputs[1], inputs[2], usermails);
						send_flag = false;
						flag = 0;
						if(send_flag) {
							socket.write('该用户账号不存在，请重新输入！\n');
						}
					} else {
						socket.write('输入内容有误，请重新输入！\n');
					}
					break;
				case 4:
					let Num = parseInt(Data);
					if(Num !== NaN) {
						emitter.emit("read_mailscontent", findUser(username), usermails, Num);
						flag = 0;
					} else {
						socket.write('输入内容有误，请重新输入！\n');
					}
					break;
				default:
					break;
			}
		}
	});
	socket.on('close', function() {
		console.log('邮件系统已关闭！\n');
		for(var i = 0; i < users.length; i++) {
			users.socket = '';
		}
	});
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log('Server started at:' + port + '\n');
});

function findUser(username) {
	for(let i = 0; i < users.length; i++) {
		if(username === users[i].username) {
			return users[i];
		}
	}
	return false;
}