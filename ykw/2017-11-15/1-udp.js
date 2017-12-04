const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('message', (message, rinfo) => {
  var debug = require('debug')('log');
  debug('log'+ 'server got: ${msg} from ${rinfo.address}:${rinfo.port}');
  debug('log'+ rinfo);
  //console.log('server got: ${msg} from ${rinfo.address}:${rinfo.port}');
});
server.bind(4333);
