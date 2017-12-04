const dgram = require('dgram');
var debug = require('debug')('udpserver');
const server = dgram.createSocket('udp4');
server.on('message',() =>{
	debug('log'+'server got: ${msg} from ${rinfo.address}:${rinfo.port}');
});
server.bind(4333);
