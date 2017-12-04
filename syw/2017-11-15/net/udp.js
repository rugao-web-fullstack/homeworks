const dgram = require(' dgram ');
var debug = require('debug')('xxx');
const server = dgram.createSocket(' udp4 ');
server.on('message', (message,rinfo) => {
  debug('log:' +'server got:' + message + ' from ' + rinfo.address + ':' + rinfo.port);
});
server.bind(4333);
