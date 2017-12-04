var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var debug = require('debug')('ago');
let message = Buffer.from('Hello Panda');
let server = '192.168.21.33';
client.send(message, 4333, server, (err) => {
    debug('what');
    if (err) throw err;
    client.close();
});
