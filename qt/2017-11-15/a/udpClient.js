var debug = require('debug')('log');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
let message = Buffer.from('Udp 客户端请求');
let server = 'localhost';
let port = 4333;
client.send(message, port, server, function () {
  debug('log:' + 'client close');
  client.close();
});