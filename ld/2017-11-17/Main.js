var net = require('net');
var StateUser = require('./states/user').User;
var StateMailer = require('./states/mail').Mail;
var Machine = require('./machine').Machine;
var debug = require('debug')('ago');
let sockets = [];//登录列表

var server = net.createServer(function(socket) {

    debug('current users = ' + sockets.length);
    let machine = new Machine();//一个状态机对应单个socket用户
    sockets.push(socket);
    new StateUser(socket);
    new StateMailer(socket);
    machine.process(socket, null);

    socket.on('data', (data) => {
        debug(data);
        debug(String(data));
        debug('data Received');
        machine.process(socket, data);
    });

});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    debug('Server started at: ' + port);
});

