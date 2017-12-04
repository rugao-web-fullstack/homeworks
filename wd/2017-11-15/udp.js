const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var debug = require('debug')('xxx');
server.on('message', () => {
  debug('log:' + 'server got: ${msg} from ${rinfo.address}:${rinfo.port}');
});
server.bind(4333);

