const net = require("net");
const server = net.createServer((socket) => {
	socket.end("Hello hw!");
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	console.log("server started at :" + port);
});
