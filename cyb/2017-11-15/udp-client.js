const dgram = require('dgram');
const client = dgram.createSocket('udp4');
var debug = require('debug')('xxx');
let message = Buffer.from('我是最帅的');
let server = '127.0.0.1';
let port = 4333;

client.send(message, port, server, (err) => {
  debug('log:' + 'Client close');
  debug('log:' + err);
  client.close();
});
