let states = require('../states').states;
const UserManager = require('../enties/user').User;

function User(socket) {
    socket.on(states.USER_NOT_LOGIN, (state, socket, data) => {
        this.stateNotLogin(state, socket, data);
    });
    socket.on(states.USER_LOGIN, (state, socket, data) => {
        this.stateLogin(state, socket, data);
    });
}

User.prototype.notLoginHome = function (state, socket, data) {
    console.log('inside user not login');
    socket.write('++++++++++++++++++++++++++++++++++++++++\n');
    socket.write('欢迎来到 XXX 邮件系统！');
    socket.write('\n\t1、注册');
    socket.write('\n\t2、登录');
    socket.write('\n++++++++++++++++++++++++++++++++++++++++');
    socket.write('\n请选择：');
    state.action = 'wait';
}
User.prototype.login = function (state, socket, data, cb) {
    let input = state.getCleanedString(socket, data);
    input = input.split(" ");
    if (input.length == 2) {
        // 用户注册的过程
        UserManager.login(socket, input[0], input[1], (err) => {
            if (!err) {
                socket.write('\n# 用户名和密码不匹配！ #');
                socket.write('\n请重新输入：');
                return;
            }
            
            socket.write('\n* 登录成功！\n');
            state.state = states.USER_LOGIN;
            state.action = '';
            state.process(socket, data);
        });
    } else {
        socket.write('# 输入错误！ #');
        socket.write('\n请重新输入：');
        return;
    }
}
User.prototype.notLoginWait = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    console.log('input = ' + input);
    switch (input) {
        case '1':
            console.log('choose 1, go to registerWait');
            this.registerWait(state, socket, data);
            break;
        case '2':
            console.log('choose 2, go to loginWait');
            this.loginWait(state, socket, data);
            break;
        default:
            console.log('not login wait default');
            break;
    }
}
User.prototype.stateNotLogin = function (state, socket, data) {
    console.log('inside stateNotLogin');
    console.log('state.action = ' + state.action);
    if (!state.action) {
        console.log('inside notLoginHome');
        this.notLoginHome(state, socket, data);
    } else {
        console.log('inside notLoginHome else');
        switch (state.action) {
            case 'register':
                console.log('inside register');
                this.register(state, socket, data);
                break;
            case 'login':
                console.log('inside login');
                this.login(state, socket, data);
                break;
            case 'wait':
                console.log('inside wait');
                this.notLoginWait(state, socket, data);
                break;
        }
    }
}
User.prototype.registerWait = function (state, socket, data) {
    socket.write('\n++++++++++++++++++++++++++++++++++++++++');
    socket.write('\n请输入注册邮箱和密码，格式： 邮箱 密码\n');
    state.action = 'register';
}
User.prototype.loginWait = function (state, socket, data) {
    socket.write('++++++++++++++++++++++++++++++++++++++++');
    socket.write('\n请输入登录邮箱和密码，格式： 邮箱 密码\n');
    state.action = 'login';
}
User.prototype.register = function (state, socket, data, cb) {
    let input = state.getCleanedString(socket, data);
    input = input.split(" ");
    if (input.length == 2) {
        // 用户注册的过程
        UserManager.register(socket, input[0], input[1], (err) => {
            if (err) {
                console.error(err);
                socket.write('\n# 用户已经存在 #');
                socket.write('\n请重新输入：');
                return;
            }
            console.log();
            socket.write('\n* 注册成功！\n');
            this.loginWait(state, socket, data);
           
        });
    } else {
        socket.write('# 格式输入错误！ #');
        socket.write('\n请重新输入：');
    }
}
User.prototype.stateLogin = function (state, socket, data) {
    console.log('inside stateLogin');
    console.log('StateAction = ' + state.action);
    if (!state.action) {
        console.log('inside loginHome');
        this.loginHome(state, socket, data);
    } else {
        console.log('inside loginHome else');
        switch (state.action) {
            case 'wait':
                console.log('inside loginWait');
                this.homeWait(state, socket, data);
                break;
        }
    }
}
User.prototype.loginHome = function (state, socket, data) {
    socket.write('\n++++++++++++++++++++++++++++++++++++++++');
    socket.write('\n您已成功登录邮件系统\n\t1、编写邮件\n\t2、查看邮件\n请选择操作方式：\n');

    state.action = 'wait';
}
User.prototype.homeWait = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    console.log("inputs = " + input);
    switch (input) {
        case '1':
            console.log('inside mail write');
            socket.write('+++++++++++++++++++++++++++++++++++++++++');
            socket.write('\nMail Write: ');
            state.state = states.MAIL_WRITE;
            state.action = '';
            socket.emit(states.MAIL_WRITE, state, socket, data);
            break;
        case '2':
            console.log('inside mail read');
            socket.write('+++++++++++++++++++++++++++++++++++++++++');
            socket.write('\nMail Read: ');
            state.state = states.MAIL_READ;
            state.action = '';
            socket.emit(states.MAIL_READ, state, socket, data);
            break;
        default:
            console.log('inside homeWait default')
            break;
    }
}

module.exports.User = User;