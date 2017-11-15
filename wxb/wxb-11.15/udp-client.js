var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var message = new Buffer('hi server ');

client.send(message,0,message.length,12345,'127.0.0.1');

client.on('message',function (msg) {
    console.info("client know server has got the message");
});
