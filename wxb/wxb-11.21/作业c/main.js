var debug = require('debug')('main');

const net = require('net');
const StateUser = require('./states/user').User;
const StateMailer = require('./states/mail').Mail;
const Machine = require('./machine').Machine;
// const read = require("./entities/user").read;
let sockets = [];


const server = net.createServer(function (socket) {
    let machine = new Machine();
    sockets.push(socket);
    new StateUser(socket);
    new StateMailer(socket);
    debug('socket connected!');
    machine.process(socket, null);
    socket.on('data', function (data) {
        debug(data);
        debug(String(data));
        debug('data received!');
        machine.process(socket, data);
    });
});

let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
    debug('Server started at: ' + port);
});
