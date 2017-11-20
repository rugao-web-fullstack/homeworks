const UserManager = require('../entities/user').User;

function User(socket) {
    socket.on("user-not-login", (state, socket, data) => {
        this.notLogin(state, socket, data)
});
    socket.on("user-home", (state, socket, data) => {
        this.home(state, socket, data)
});
}

User.prototype.homeWait = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    console.log('input')
    if (input === '1') {
        state.state = 'email-write';
        state.action = '';
        console.log("inside 1");
        socket.emit("mail-write", state, socket, data);
    } else if (input === '2') {
        state.state = 'email-read';
        state.action = '';
        console.log("inside 2");
        socket.emit("mail-read", state, socket, data);
    } else {
        socket.write('\n输入错误!\n');
        this.homeDefault(state, socket, data);
    }
};

User.prototype.homeDefault = function (state, socket, data) {
    socket.write("\n你已经成功登录邮件系统\n\t1.编写邮件\n\t2.查看邮件\n请输入：")
    state.action = "wait";
};

User.prototype.home = function (state, socket, data) {
    console.log("inside home");
    console.log("this.action === " + state.action);
    if (!state.action) {
        this.homeDefault(state, socket, data);
    } else {
        console.log("inside not login");
        let cmd = state.getCleanedString(socket, data);
        console.log("cmd = " + cmd);
        if (cmd === 'exit') {
            if (state.action === 'wait') {
                state.state = 'user-not-login';
                state.action = "";
                socket.emit("user-not-login", state, socket, data);
                return;
            }
            state.action = '';
            this.homeDefault(state, socket, data);
            return;
        }
        switch (state.action) {
            case 'wait':
                this.homeWait(state, socket, data);
                break;
            case 'email-write':
                console.log('inside mail-write');
                socket.emit("email-write", state, socket, data);
                break;
            case 'email-read':
                console.log('inside mail-read');
                socket.emit("email-read", state, socket, data);
                break;
        }
    }
};

User.prototype.login = function (state, socket, data) {
    console.log("inside login");
    let input = state.getCleanedString(socket, data);
    input = input.split(" ");
    console.log("input =" + input);
    if (input.length === 2) {
        if (UserManager.login(socket, input[0], input[1])) {
            socket.write('\n登录成功！\n');
            state.state = 'user-home';
            state.action = '';
            state.process(socket);
        } else {
            socket.write("登录失败！用户名与密码不匹配！\n");
        }
    } else {
        socket.write("输入有误，请重新输入！格式： 邮箱 密码\n");
    }
};

User.prototype.idle = function (state, socket, data) {
    socket.write("\n欢迎使用邮件服务系统\n\t1.注册\n\t2.登陆\n请输入：")
    state.action = "wait";
};

User.prototype.wait = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    switch (input) {
        case '1':
            socket.write('\n请输入你要注册的邮箱和密码，格式： 邮箱 密码\n');
            state.action = 'register';
            break;
        case '2':
            socket.write('\n请输入您的邮箱和密码，格式： 邮箱 密码\n');
            state.action = 'login';
            break;
        default:
            socket.write('\n输入错误，请重新输入!\n');
    }
};

User.prototype.notLogin = function (state, socket, data) {
    console.log("this.action === " + state.action);
    console.log(state.state);
    if (!state.action) {
        this.idle(state, socket, data);
    } else {
        console.log("inside not login");
        let cmd = state.getCleanedString(socket, data);
        console.log("cmd = " + cmd);
        if (cmd === 'exit') {
            state.action = '';
            this.idle(state, socket, data);
            return;
        }

        switch (state.action) {
            case 'wait':
                this.wait(state, socket, data)
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

User.prototype.register = function (state, socket, data) {
    console.log("inside register");
    let input = state.getCleanedString(socket, data);
    input = input.split(" ");
    if (input.length === 2) {
        if (UserManager.register(socket, input[0], input[1])) {
            socket.write('\n注册成功！\n');
            socket.write('\n请输入您的邮箱和密码，格式： 邮箱 密码\n');
            state.action = 'login';
        } else {
            socket.write("用户已经存在！\n");
        }
    } else {
        socket.write("输入有误，请重新输入！格式： 邮箱 密码\n");
    }
}

exports.User = User;