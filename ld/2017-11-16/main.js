var net = require('net');
var User = require('./user').User;
var Message = require('./message').Message;
var EventEmitter = require('events');
var debug = require('debug')('ago');
var emitter = new EventEmitter();

let sockets = [];
var user = new User(emitter);
var message = new Message(emitter, sockets);

function req(socket) {
    this.socket = socket;
    this.print = function() {
        socket.write('请输入用户名密码和邮箱，用空格隔开\n');
    };
}

var server = net.createServer((socket) => {
    sockets.push(socket);
    let request = new req(socket);
    request.print();
    socket.on('data', function (data) {
        message = new String(data);
        debug('message:' + message);
        let inputs = message.split(' ');
        debug(inputs);
        if (inputs.length === 3) {
            user.register(inputs[0], inputs[1], inputs[2]);
            let userInfo = {username: inputs[0]};
            emitter.emit('user-register', socket, userInfo);
        }

    });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    debug('服务端口: ' + port +' 开启');
});

