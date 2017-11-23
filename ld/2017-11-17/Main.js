const net = require("net");
const StateUser = require("./states/user").User;
const StateMailer = require("./states/mail").Mail;
const Machine = require("./machine").Machine;

let sockets = [];//登录列表

var server = net.createServer(function(socket) {

    console.log("current users = " + sockets.length);
	let machine = new Machine();//一个状态机对应单个socket用户
    sockets.push(socket);
	new StateUser(socket);
	new StateMailer(socket);
	machine.process(socket, null);

    socket.on("data", (data) => {
		console.log(data);
		console.log(String(data));
		console.log("data Received");
		machine.process(socket, data);
    });

});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    console.log("Server started at: " + port);
});

