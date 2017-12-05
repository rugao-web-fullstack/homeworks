var debug = require('debug')('log');
var udp = require('dgram');
var server = udp.createSocket('udp4');
server.on('message', function (msg, rinfo) {
  // console.log(`server got:${msg} from ${rinfo.address}:${rinfo.port}`);
  debug('log:' + 'server got:' + msg + 'from' + rinfo.address + ':' + rinfo.port);
});
server.bind(4333);
