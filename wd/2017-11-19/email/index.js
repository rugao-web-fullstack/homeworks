const net = require("net");
const Main = require("./main.js").Main;
const Register = require("./register.js").Register;
const Login = require("./login.js").Login;
const Menu = require("./menu.js").Menu;
const WriteHead = require("./writehead.js").WriteHead;
const WriteBody = require("./writebody.js").WriteBody;
const Read = require("./read.js").Read;
let clientList = [];
let zcArr = [];//所有用户名，密码，地址
let Message = [];//邮件内容[收件人，内容，寄件人]
var server = net.createServer((client) => {
	let dlArr = [];//登录后保存
	Main(client, clientList);
	Register(client, zcArr);
	Login(client, dlArr, zcArr, clientList);
	Menu(client);
	WriteHead(client, zcArr, dlArr, Message, clientList);
	WriteBody(client, dlArr, Message, zcArr, clientList);
	Read(client, dlArr, Message);
	client.emit("main");

	client.on("data", (data) => {
		if (data.toString().split("\r\n")[0] === "q") {//退出		
			client.end("bye bye!");
		}
	});
	client.on("close", (data) => {
		for (let i = 0; i < clientList.length; i++) {//删除client
			if (clientList[i] === client) {
				clientList.splice(i, 1);
			}
		}
	});
});
server.listen(8080);
