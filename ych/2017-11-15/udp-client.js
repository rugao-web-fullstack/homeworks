var debug = require('debug')('udp-client');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
let message = Buffer.from('udp ych');
let server = '192.168.21.19';
let port = 4333;
client.send(message, port, server, () => {
  debug('client close');
  client.close();
});
server.on('message', () => {
  debug('server got: ${message} from ${rinfo.address}:${rinfo.port}');

});
