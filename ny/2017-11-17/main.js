const net = require('net');
const EventEmitter = require('events');
const StateMachine = require('./machine').StateMachine;
const StateUser = require("./states/user").User;
const StateMailer = require("./states/mailer").Mailer;
const UserManager = require("./entities/user").User;

const emitter = new EventEmitter();

// All sockets connections
let sockets = [];
let machine = new StateMachine(sockets);


var server = net.createServer(function (socket) {
    sockets.push(socket);
    new StateUser(socket);
    new StateMailer(socket);
    machine.process(socket, null);
    socket.on('data', function (data) {
        machine.process(socket, data);
    });
    socket.on('close', function () {
        console.log("客户端连接已经断开！");
        for (var i = 0; i < sockets.length; i++) {
            let s = sockets[i];
            if (s === socket) {
                sockets.splice(i, 1);
                UserManager.removeSocket(socket);
                console.log("socket已经移除!");
            }
        }
    });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    console.log("Server started at: " + port);
});