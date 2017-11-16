var net = require("net");

var server = net.createServer();

server.on('connection',function (socket) {
    console.log("连接已建立"+server.address().address);
    socket.on('data',function (data) {
        console.log("已接收到数据 "+data);
        socket.write(data.toString().split(",")[0]);
    });
});

server.listen(8080,'localhost',function () {
    console.log("服务器开始监听");
});
server.on('close', function(data) {
    console.log('CLOSED: ' +
        server.remoteAddress + ' ' + server.remotePort);
});