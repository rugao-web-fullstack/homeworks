const net = require("net");
const EventEmitter = require('events');
const emitter = new EventEmitter();
const User = require('./user').User;
const Message = require('./message').Message;
const Mail = require('./mail').Mail;

const message = new Message(emitter);
const mail = new Mail(emitter);

//指令列表
let commands = [{
	act: 'signin',
	des: '注册Dmail邮件系统。\n',
	mes: '请输入您想注册的的账号密码，并用‘，’隔开：\n'
},
{
	act: 'login',
	des: '登录Dmail邮件系统。\n',
	mes: '请输入您的账号密码，并用‘,’隔开：\n'
},
{
	act: 'send',
	des: '发送邮件到指定Dmail系统用户\n',
	mes: '请输入收信人的用户名，邮件标题以及邮件内容，并用‘,’隔开：\n'
},
{
	act: 'mail',
	des: '读取个人邮件箱。\n',
	mes: '您的历史收件信息如下：(*输入序号打开邮件)\n'
},
{
	act: 'close',
	des: '退出Dmail邮件系统。\n',
	mes: '期待您的下一次使用！\n'
},
{
	act: 'logout',
	des: '登出当前账号Dmail邮件系统。\n',
	mes: '您已成功登出\n'
}];
let sockets = [];//登录用户列表
let users = [];//注册用户列表
let usermail = [];//用户邮件列表
const server = net.createServer((socket) => {
	let flag = 0;//初始化程序入口为选择程序入口
	let username = '';
	sockets.push(socket);
	socket.write("\n\n\n\n\n");
	socket.write('欢迎使用Dmail系统！\n');
	socket.write('输入命令:help获取指令列表！\n');
	socket.on('data', (data) => {
		var Data = data.toString().replace(/[\r\n]/g, '');//指令解析
		let inputs = '';
		if (flag === 0) {
			//根据指令修改程序入口标记
			switch (Data) {
				case 'help':
					console.log('help');
					for (let i = 0; i < commands.length; i++) {
						socket.write(commands[i].act + ':\t' + commands[i].des);
					}
					socket.write("\n");
					break;
				case 'signin':
					socket.write(commands[0].mes);
					flag = 1;
					break;
				case 'login':
					if (username === '') {
						socket.write(commands[1].mes);
						flag = 2;
					} else {
						socket.write('您已经登录其他账号，请输入logout退出当前用户\n');
					}
					break;
				case 'send':
					if (username === '') {
						socket.write('此功能不支持离线使用，请输入signin注册或login登录\n');
					} else {
						socket.write(commands[2].mes);
						flag = 3;
					}
					break;
				case 'mail':
					if (username === '') {
						socket.write('此功能不支持离线使用，请输入signin注册或login登录\n');
					} else {
						socket.write(commands[3].mes);
						emitter.emit('read-maillist', findUser(username), usermail);
						flag = 4;
					}
					break;
				case 'close':
					socket.write(commands[4].mes);
					socket.end();
					break;
				case 'logout':
					socket.write(commands[5].mes);
					findUser(username).socket = '';
					username = '';

					break;
				default:
					socket.write(Data + "不是Dmail系统有效指令，输入命令:help获取指令列表！\n");
					break;
			}
		} else {
			//根据入口标记执行对应程序
			switch (flag) {
				case 1:
					let register_flag = true;
					inputs = Data.split(",");
					if (inputs.length === 2) {
						let user = new User(emitter);
						user.register(inputs[0], inputs[1], socket);
						if(findUser(username)){
							emitter.emit("user-register", socket, false);
							register_flag = false;
						}	
						if (register_flag) {
							emitter.emit("user-register", socket, true);
							console.log(user.username + "用户注册成功");
							users.push(user);
							username = inputs[0];
							flag = 0;
							if (username !== '') {
								socket.write(username + '欢迎回来！\n');
							}
						}
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				case 2:
					let login_flag = true;
					inputs = Data.split(",");
					if (inputs.length === 2) {
						let user = new User(emitter);
						user.register(inputs[0], inputs[1], socket);
						if (findUser(inputs[0])) {
							nowUser = findUser(inputs[0]);
							if (nowUser.password === user.password) {
								username = user.username;
								nowUser.socket = socket;
								emitter.emit("user-login", socket, true);
								login_flag = false;
								flag = 0;
							} else {
								emitter.emit("user-login", socket, false);
								login_flag = false;
							}
						}
						if (login_flag) {
							socket.write('该账号不存在，请重新输入\n');
						}
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				case 3:
					let send_flag = true;
					inputs = Data.split(",");
					if (inputs.length === 3) {
						emitter.emit('send-mail', findUser(inputs[0]), username, inputs[1], inputs[2], usermail);
						send_flag = false;
						flag = 0;
						if (send_flag) {
							socket.write('该账号不存在，请重新输入\n');
						}
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				case 4:
					let cho = parseInt(Data);
					if (cho !== NaN) {
						emitter.emit('read-mailcontent', findUser(username), usermail, cho);
						flag = 0;
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				default:
					break;
			}
		}
	});
	socket.on('close', function () {
		console.log("client disconnected");
		for (var i = 0; i < users.length; i++) {
			users[i].socket = '';
		}
	});
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log('Dmail服务开启');
});
function findUser(username){
	for (let i = 0; i < users.length; i++) {
		if (username === users[i].username) {
			return users[i];
		}
	}
	return false;
}
