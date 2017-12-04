const dgram = require('dgram');
var debug = require('debug');
const client = dgram.createSocket('udp4');
let message = Buffer.from('Udp 客户端请求');
let server = 'localhost';
let port = 4333;

client.send(message, port, server, () => {
  debug('client close');
  client.close();
});