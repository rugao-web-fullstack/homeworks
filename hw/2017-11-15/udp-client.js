var debug = require('debug')('xxx');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
let message = Buffer.from('hw');
let server = '192.168.21.33';
let port = 4333;
client.send(message, port, server, (err) => {
  debug('log:' + 'client close');
  debug('log:' + err);
  client.close();
});


