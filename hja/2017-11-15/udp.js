var udp = require('dgram');
var debug = require('debug')('udp');
var server = udp.createSocket('udp4');
server.on('message', function (msg, rinfo) {  
  debug('log:'+'server got:'+ msg + 'from' + rinfo.address + ':' + rinfo.port);
});
server.bind(4333);
