const net = require("net");
const server = net.createServer((socket) => {
	socket.end("Hello Goodbye");
});
let port = process.env.NODE_PORT || 8888;
server.listen(port, () => {
	console.log("本服务器在 "+port+ " 端口打开");
});
