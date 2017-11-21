const UserMannager = require('./Man/user').User;

function User(socket) {
    var $this = this;
    socket.on('user-not-login', function (state, socket, data) {
        $this.notLogin(state, socket, data)
    });
    socket.on('user-home', function (state, socket, data) {
        $this.home(state, socket, data);
    });
}

User.prototype.idle = function (state, socket, data) {
    socket.write('\n欢迎使用邮件系统\n\t1.注册\n\t2.登录\n请输入:');
    //更改action进入wait等待指令操作
    state.action = 'wait';
}
User.prototype.wait = function (state, socket, data) {
    let input = state.getCleaningString(socket, data);
    switch (input) {
        case '1':
            socket.write('\n请输入你要注册的邮箱密码,空格隔开\n');
            state.action = 'register';
            break;
        case '2':
            socket.write('\n请输入您的邮箱密码\n');
            state.action = 'login';
            break;
        default:
            socket.write('\n指令错误，请重新输入\n');
    }
}
User.prototype.register = function (state, socket, data) {
    let input = state.getCleaningString(socket, data);
    input = input.split(' ');
    if (input.length === 2) {
        if (UserMannager.register(socket, input[0], input[1])) {
            socket.write('\n注册成功!\n');
            socket.write('\n请输入您的邮箱帐号和密码\n');
            state.action = 'login';
        } else {
            socket.write('用户已存在\\n');
        }
    } else {
        socket.write('输入有误,请重新输入\n');
    }
}
User.prototype.login = function (state, socket, data) {
    let input = state.getCleaningString(socket, data);
    input = input.split(' ');
    if (input.length === 2) {
        if (UserMannager.login(socket, input[0], input[1])) {
            socket.write('\n登录成功\n');
            state.state = 'user-home';
            state.action = '';
            state.process(socket);//---去更改state,进入user-home状态
        } else {
            socket.write('登陆失败,用户名或密码错误\n');
        }
    } else {
        socket.write('输入有误,重新输入\n');
    }
}
User.prototype.notLogin = function (state, socket, data) {
    if (!state.action) {
        this.idle(state, socket, data);
    } else {
        let cmd = state.getCleaningString(socket, data);
        if (cmd === '.exit') {
            state.action = '';
            this.idle(state, socket, data);
            return;
        }
        switch (state.action) {
            case 'wait':
                this.wait(state, socket, data);
                break;
            case 'register':
                this.register(state, socket, data);
                break;
            case 'login':
                this.login(state, socket, data);
                break;
        }
    }
};
User.prototype.homeDefault = function (state, socket, data) {
    socket.write('\n你已经成功登陆了邮件系统\n\t1.编写邮件\n\t2.查看邮件\n请输入:\n');
    state.action = 'wait';
};
User.prototype.home = function (state, socket, data) {
    console.log('进入主页面\n');
    //此时action是空
    if (!state.action) {
        this.homeDefault(state, socket, data);
    } else {
        let cmd = state.getCleaningString(socket, data);
        if (cmd === 'exit') {
            if (state.action === 'wait') {
                state.state = 'user-not-login';
                state.action = '';
                socket.emit('user-not-login', state, socket, data);
                return;
            }
            state.action = '';
            this.homeDefault(state, socket, data);
            return;
        }
        switch (state.action) {
            case "wait":
                this.homeWait(state, socket, data);
                break;
            case 'email-write':
                console.log('进入编写环节\n');
                socket.emit('email-write', state, socket, data);
                break;
            case 'emial-read':
                console.log('进入阅读环节\n');
                socket.emit('email-read', state, socket, data);
                break;
        }
    }

};
User.prototype.homeWait = function (state, socket, data) {
    console.log('-------');
    let input = state.getCleaningString(socket, data);
    if (input === '1') {
        console.log('11111111');
        state.state = 'email-write';
        state.action = '';
        socket.emit('email-write', state, socket, data);
    } else if (input === '2') {
        state.state = 'email-read';
        state.action = '';
        socket.emit('email-read', state, socket, data);
    } else {
        socket.write('\n输入错误\n');
        this.homeDefault(state, socket, data);
    }
};
exports.User = User;