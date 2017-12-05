var debug = require('debug')('gq');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('messgae', () => {
	debug('server got: ${message} from ${rinfo.address}:${rinfo,port}\n');
//server.send("server:"+new Date()+"message'"+message+"'received!\n,rinfo.port,rinfo.address);
});
server.bind(4333);

