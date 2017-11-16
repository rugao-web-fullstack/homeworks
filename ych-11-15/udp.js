const dgram = require("dgram");
const server = dgram.createSocket("udp4");
server.on("message", (message, rinfo) => {
	console.log('server got: ${message} from ${rinfo.address}:${rinfo.port}');

});
server.bind(4333);
