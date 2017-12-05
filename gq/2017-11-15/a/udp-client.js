var debug = require('debug')('gq');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
let message = Buffer.from('Udp 孙丑丑大傻子');
//let server = 'localhost';
let server = '192.168.21.33';
let port = 4333;
client.send(message, port, server, () => {
  debug('client close');

  client.close();
});

