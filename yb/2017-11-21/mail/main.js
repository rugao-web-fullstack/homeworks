const net = require("net");
const StateUser = require('./states/user').User;
const StateMailer = require('./states/mail').Mail;
const Machine = require("./machine").Machine;
let sockets = [];
const server = net.createServer(function(socket) {
	let machine = new Machine();
	sockets.push(socket);
	new StateUser(socket);
	new StateMailer(socket);
	console.log("socket connected!");
	machine.process(socket, null);
	socket.on('data', function(data) {
		console.log(data);
		console.log(String(data));
		console.log("data received!");
		machine.process(socket, data);
	});
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("Server started at: " + port);
});