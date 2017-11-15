var dgram = require("dgram");
var server = dgram.createSocket("udp4");

server.on('listening',function () {
    console.info('server is listening');
});

server.on('message',function (msg,rinfo) {
    console.info('get message:' + msg + 'from' + rinfo.address + ":" + rinfo.port);
    var message = new Buffer('I got message ! from server');
    server.send(message,0,message.length,rinfo.port,rinfo.address);
});
server.bind(12345);
