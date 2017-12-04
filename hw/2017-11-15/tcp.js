var debug = require('debug')('xxx');
const net = require("net");
const server = net.createServer((socket) => {
	socket.end("Hello hw!");
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
	debug("log:" +"server started at :" + port);
});
