var debug = require('debug')('udp');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', () => {
  debug('server got: ${message} from ${rinfo.address}:${rinfo.port}');

});
server.bind(4333);
