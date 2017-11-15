const net = require('net');
const server = net.createServer();
server.on("connection", function (socket) {
	console.log("server to client has builded");
	socket.on("data", function (data) {
		if (data == "0") {
			console.log("process exited!");
			process.exit();
		} else if (data == "1") {
			socket.end(function () {
				console.log("tcp server is closed!");	
			});
		}
		
	});
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("Server started at :" + port);
});
