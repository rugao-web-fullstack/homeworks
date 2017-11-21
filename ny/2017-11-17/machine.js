const states = [
    'user-not-login', // 这时可以 login, register
    'user-home',  // 这时可以logout  // 查看邮件， 写邮件，
    'mail-write',   // 编写邮件
    'mail-read',    // 阅读邮件, 删除邮件
];

function StateMachine(sockets) {
    this.state = 'user-not-login';
    this.action = '';
    this.sockets = sockets;
}

StateMachine.prototype.process = function (socket, data) {
    console.log("inside process");
    switch (this.state) {
        // 用户登录主界面
        case 'user-home':
            socket.emit('user-home', this, socket, data);
            break;
        case 'mail-write':
            socket.emit('mail-write', this, socket, data);
            break;
        case 'mail-read':
            socket.emit('mail-read', this, socket, data);
            break;
        // 用户未登录
        default:
            socket.emit('user-not-login', this, socket, data);
            break
    }

}

StateMachine.prototype.getCleanedString = function (socket, data) {
    let string = new String(data);
    string = string.replace(/(\n|\r)+$/, '');
    console.log(string);
    return string;
}

exports.StateMachine = StateMachine;