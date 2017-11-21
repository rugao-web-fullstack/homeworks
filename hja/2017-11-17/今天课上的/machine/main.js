const net = require('net');
const StateUser = require('./user').User;
const StateMail = require('./mail').Mailer;
const eventsEmitter = require('events');
const StateMachine = require('./machine').StateMachine;
let sockets = [];

var server = net.createServer(function (socket) {
    let machine = new StateMachine();
    sockets.push(socket);
    new StateUser(socket);
    new StateMail(socket);
    machine.process(socket, null);
    socket.on('data', function (data) {
        console.log(1);
        machine.process(socket, data);
    });
    socket.on('close', function () {
        console.log('客户端链接已断开\n');
        for (let i = 0; i < sockets.length; i++) {
            if (sockets[i] === socket) {
                sockets.splice(i, 1);
                console.log('socket移除\n');
            }
        }
    });
});
server.listen(8080, '127.0.0.1');