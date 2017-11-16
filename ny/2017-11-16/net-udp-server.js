const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', (msg, rinfo) => {
	server.send("message '" + msg + "' received!", rinfo.port, rinfo.address);
	console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
server.on('listening', () => {
	  const address = server.address();
	  console.log(`server listening ${address.address}:${address.port}`);
});
server.bind(4333);