var net = require('net');
var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        if (Buffer.compare(data, Buffer.from('close socket\r\n')) == 0) {
            socket.end();
        } else if (Buffer.compare(data, Buffer.from('close server\r\n')) == 0) {
            socket.end();
            server.close();
        }
    })
});

var port = process.env.NODE_PORT || 8080;
server.listen(port, function () {
    console.log('运行在' + port)
});

