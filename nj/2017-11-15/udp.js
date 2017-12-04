var debug = require('debug')('xxx');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', (msg, rinfo) => {
    debug('log:' + `server got:${msg} from ${rinfo.address}:${rinfo.port}`);
});
server.bind(4333);
