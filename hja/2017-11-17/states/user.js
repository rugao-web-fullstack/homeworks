let states = require("../states").states;
const UserManager = require('../entities/user').User;

function User(socket) {
    socket.on(states.USER_NOT_LOGIN,
        (state, socket, data) => {
        this.stateNotLogin(state, socket, data);
})
    ;
    socket.on(states.USER_LOGIN,
        (state, socket, data) => {
        this.stateLogin(state, socket, data);
})
    ;
}

User.prototype.notLoginHome = function (state, socket, data) {
    console.log("inside user not login");
    socket.write("欢迎来到XXX邮件系统！请选择:\n\t1.用户注册\n\t2.用户登录\n");
    state.action = 'wait';
}

User.prototype.login = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    input = input.split(" ");
    if (input.length === 2) {
        // User Register
        if (UserManager.login(socket, input[0], input[1])) {
            socket.write('\n登录成功！\n');
            state.state = states.USER_NOT_LOGIN;
            state.action = '';
            socket.emit(states.USER_LOGIN, state, socket, null);
        } else {
            socket.write('\n用户名或者密码不匹配！\n');
        }
    } else {
        socket.write("输入错误!");
    }
};

User.prototype.notLoginWait = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    console.log("input = " + input);
    switch (input) {
        case '1':
            console.log("inside not login wait 1");
            this.registerWait(state, socket, data);
            break;
        case '2':
            console.log("inside not login wait 2");
            this.loginWait(state, socket, data);
            break;
        default:
            console.log("inside not login wait default");
            break;
    }
}

User.prototype.stateNotLogin = function (state, socket, data) {
    console.log("inside not login");
    if (!state.action) {
        console.log("inside not login home");
        this.notLoginHome(state, socket, data);
    } else {
        console.log("inside not login else");
        switch (state.action) {
            case 'register':
                this.register(state, socket, data);
                break;
            case 'login':
                console.log("inside login");
                this.login(state, socket, data);
                break;
            case 'wait':
                console.log("inside not login wait");
                this.notLoginWait(state, socket, data);
                break;
        }
    }
};

User.prototype.registerWait = function (state, socket, data) {
    socket.write('\n请输入注册邮箱和密码，格式： 邮箱 密码\n');
    state.action = 'register';
}

User.prototype.loginWait = function (state, socket, data) {
    socket.write('\n请输入登录邮箱和密码，格式： 邮箱 密码\n');
    state.action = 'login';
}

User.prototype.register = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    input = input.split(" ");
    if (input.length === 2) {
        // User Register
        if (UserManager.register(socket, input[0], input[1])) {
            socket.write('\n注册成功！\n');
            this.loginWait(state, socket, data);
        } else {
            socket.write('\n用户已经存在！\n');
        }
    } else {
        socket.write("输入错误!");
    }
};

User.prototype.stateLogin = function (state, socket, data) {
    console.log("inside login");
    if (!state.action) {
        console.log("inside not login home");
        this.loginHome(state, socket, data);
    } else {
        console.log("inside not login else");
        switch (state.action) {
            case 'wait':
                console.log("inside not login wait");
                this.loginWait(state, socket, data);
                break;
        }
    }
};

User.prototype.loginHome = function (state, socket, data) {
    socket.write("\n你已经成功登录邮件系统\n\t1.编写邮件\n\t2.查看邮件\n请输入：")
    state.action = "wait";
};

exports.User = User;