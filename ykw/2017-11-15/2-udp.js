const dgram = require('dgram');
const client = dgram.createSocket('udp4');
let message = Buffer.from('udp 客户端请求9999999');
let server = 'localhost';
let port = 4333;
client.send(message, port, server, (err) => {
  var debug = require('debug')('log');
  debug('log'+ 'client close');
  debug('log'+ err);
  //console.log('client close');
  client.close();
});
