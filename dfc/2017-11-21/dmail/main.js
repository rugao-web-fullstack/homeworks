const net = require("net");
const EventEmitter = require('events');
const emitter = new EventEmitter();
const User = require('./user').User;
const Mail = require('./mail').Mail;
let mail = new Mail(emitter);
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
let users = [];//注册用户列
const server = net.createServer((socket) => {
	let flag = 0;//初始化程序入口为选择程序入口
	let username = '';
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
					if (username === '') {
						socket.write(commands[0].mes);
						flag = 1;
					} else {
						socket.write('您已经登录其他账号，请输入logout退出当前用户\n');
					}
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
						emitter.emit('read-maillist', username, socket);
						flag = 4;
					}
					break;
				case 'close':
					socket.write(commands[4].mes);
					socket.end();
					break;
				case 'logout':
					socket.write(commands[5].mes);
					users[username] = '';
					username = '';

					break;
				case 'test':
					console.log(users[1].socket);
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
						if (users[inputs[0]]) {
							emitter.emit("user-register", socket, false);
						} else {
							users = [];
							user.register(inputs[0], inputs[1], socket);
							username = inputs[0];
							flag = 0;
						}
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				case 2:
					inputs = Data.split(",");
					if (inputs.length === 2) {
						let user = new User(emitter, users);
						flag = 0;
						username = inputs[0];
						user.login(inputs[0], inputs[1], socket);
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				case 3:
					inputs = Data.split(",");
					if (inputs.length === 3) {
						if (users[inputs[0]]) {
							emitter.emit('send-mail', inputs[0], username, inputs[1], inputs[2], users[inputs[0]]);
							send_flag = false;
							flag = 0;
							socket.write('邮件发送成功\n');
						} else {
							socket.write('该账号不存在，请重新输入\n');
						}
					} else {
						socket.write('您输入的内容格式有误，请重新输入\n');
					}
					break;
				case 4:
					let cho = parseInt(Data);
					if (cho !== NaN) {
						let usermail = [];//用户邮件列表
						console.log(cho + '///////////////////')
						emitter.emit('read-mailcontent', username, socket, cho);
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