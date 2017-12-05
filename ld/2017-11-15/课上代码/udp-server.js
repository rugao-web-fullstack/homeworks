var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var debug = require('debug')('ago');
server.on('message', (msg, rinfo) => {
    debug('server got:$(msg) from $(rinfo.address):$(rinfo.port)');
    debug('log: '+rinfo);
});
server.bind(4333);
