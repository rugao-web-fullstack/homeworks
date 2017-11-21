//进行状态的设置
const states = [
    'user-not-login',//用户未登录,显示登陆注册操作
    'user-home',//用户首页
    'email-write',//写邮件
    'email-read'//阅读
];

function StateMachine() {
    //开始默认state为未登录
    this.state = 'user-not-login';
    //---定义此时动作行为
    this.action = '';
}

StateMachine.prototype.process = function (socket, data) {
    switch (this.state) {
        case 'user-home':
            socket.emit('user-home', this, socket, data);
            break;
        case 'email-write':
            socket.emit('email-write', this, socket, data);
            break;
        case 'email-read':
            socket.emit('email-read', this, socket, data);
        //未登录
        default:
            socket.emit('user-not-login', this, socket, data);
            break;
    }
}

StateMachine.prototype.getCleaningString = function (socket, data) {
    let string = new String(data);
    string = string.replace(/(\n|\r)+$/, '');
    return string;
}
exports.StateMachine = StateMachine;