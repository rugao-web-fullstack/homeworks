var net = require('net');
var debug = require('debug')('ago');
var server = net.createServer((socket) => {
    socket.end('Hello Goodbye');
});
let port = process.env.NODE_POST || 8888;
server.listen(port, () => {
    debug('本服务器在 ' + port + ' 端口打开');
});
