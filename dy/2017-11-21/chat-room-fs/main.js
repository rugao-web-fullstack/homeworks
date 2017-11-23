/**
 * 邮箱交流：
 * 1、有一个用户的注册地址
 * 2、可以识别用户（可以考虑登录）
 * 3、写正文
 * 4、可以阅读（包括历史）
 * 5、提醒
 */
const net = require('net');
const Machine = require('./machine').Machine;
const StateUser = require('./states/user').User;
const StateMailer = require('./states/mail').Mail;

let sockets = [];

const server = net.createServer((socket) => {
    let machine = new Machine();
    
    sockets.push(socket);
    new StateUser(socket);
    new StateMailer(socket);
    
    console.log('socket connected!');

    machine.process(socket, null);

    socket.on('data', (data) => {
        console.log(data.toString().trim());
        console.log('data received');
        machine.process(socket, data);
    });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    console.log('Server started at: ' + port);
});