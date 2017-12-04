const dgram = require('dgram');
const client = dgram.createSocket('udp4');
var debug = require('debug')('xxx');
let message = Buffer.from('Udp server request');
let server = '192.168.21.33';
let port = 4333;
client.send(message, port, server, (err) => {
  debug('log:' + 'client close');
  client.close();
  return(err);
});
