var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var debug = require('debug')('udp-client');

var message = new Buffer('hi server ');

client.send(message, 0, message.length, 12345, '127.0.0.1');

client.on('message', function () {
  debug('log: '+'client know server has got the message');
});
