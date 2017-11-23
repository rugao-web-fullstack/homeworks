let states = require('../states').states;
const UserManager = require('../enties/user').User;
const MailManager = require('../enties/mail').Mail;

// 用于处理邮件与用户的交互
function Mail(socket) {
    this.title = '';
    this.body = [];
    this.address = '';

    socket.on(states.MAIL_WRITE, (state, socket, data) => {
        this.stateWrite(state, socket, data)
    });
    socket.on(states.MAIL_READ, (state, socket, data) => {
        this.stateRead(state, socket, data)
    });
    socket.on(states.MAIL_NEW, (sender, mail) => {
        this.onNewMail(socket, sender, mail);
    })
}
// 邮件写状态下，基本的接收入口
Mail.prototype.stateWrite = function (state, socket, data) {
    console.log('inside stateWrite');
    if (!state.action) {
        console.log('inside stateWrite home');
        this.stateWriteHome(state, socket, data);
    } else {
        console.log('inside stateWrite else ')
        switch (state.action) {
            case 'address':
                this.getAddress(state, socket, data);
                break;
            case 'title':
                this.getTitle(state, socket, data);
                break;
            case 'body':
                this.getBody(state, socket, data);
                break;
            case 'wait':
                console.log('inside stateWriteWait');
                this.stateWriteWait(state, socket, data);
                break;
        }
    }
}

// 写邮件的页面
Mail.prototype.stateWriteHome = function (state, socket, data) {
    socket.write('\n请输入要发送的详细信息，\n\t1、收件人地址\n\t2、标题\n\t3、正文内容\n\t4、发送邮件\n');
    state.action = 'wait';
}

// 主页面接收用户输入的函数
Mail.prototype.stateWriteWait = function (state, socket, data) {
    console.log('inside stateWriteWait');
    let input = state.getCleanedString(socket, data);
    console.log("input = " + input);
    switch (input) {
        case '1':
            this.stateWriteAddressWait(state, socket, data);
            break;
        case '2':
            this.stateWriteTitleWait(state, socket, data);
            break;
        case '3':
            this.stateWriteBodyWait(state, socket, data);
            break;
        case '4':
            this.sendMail(state, socket, data);
            break;
        case 'exit':
            machine.state = state.USER_LOGIN;
            state.action = '';
            socket.emit(states.USER_LOGIN, machine, socket);
            break;
        default:
            console.log('insidestateWrite Default');
            break;
    }
}

// 写邮件时，接收地址输入的函数
Mail.prototype.stateWriteAddressWait = function (state, socket, data) {
    socket.write('请输入接收用户的地址：');
    state.action = 'address';
}

// 写邮件时，接收标题输入的函数
Mail.prototype.stateWriteTitleWait = function (state, socket, data) {
    socket.write('\n请输入标题：');
    state.action = 'title';
}

// 写邮件时，接收正文输入的函数
Mail.prototype.stateWriteBodyWait = function (state, socket, data) {
    socket.write('\n请输入正文内容：');
    state.action = 'body';
}

Mail.prototype.getTitle = function (state, socket, data) {
    this.title = state.getCleanedString(socket, data);
    socket.write('标题更新成功！当前的标题是：' + this.title + '\n');
    this.stateWriteHome(state, socket, data);
}

Mail.prototype.getAddress = function (state, socket, data) {
    let address = state.getCleanedString(socket, data);
    if (!UserManager.isAddress(address)) {
        socket.write('# 地址不存在，请重新输入：');
        return;
    }
    this.address = address;
    socket.write('地址更新成功！当前的地址是： ' + this.address + '\n');
    this.stateWriteHome(state, socket, data);
}

Mail.prototype.getBody = function (state, socket, data) {
    let input = state.getCleanedString(socket, data);
    if (input === '.exit') {
        socket.write('# 正文更新成功！当前正文内容是：\n');
        for (let i = 0; i < this.body.length; i++) {
            socket.write(this.body[i] + "\n\r");
        }
        socket.write('======= 正文结束 =======');
        this.stateWriteHome(state, socket, data);
    } else {
        this.body.push(input);
    }
}

Mail.prototype.sendMail = function (state, socket, data) {
    let user = UserManager.getUserBySocket(socket);
    if (!MailManager.send(
        user.email,
        this.address,
        this.title,
        this.body.join("\n\r"))) {
        return socket.write('* 发送失败！\n');
    }
    return socket.write('* 邮件发送成功！\n');
};

Mail.prototype.onNewMail = function (socket, sender, mail) {
    socket.write('【 你收到来自 < ' + sender + ' > 的一封新邮件！】\n');
}

// 邮件读状态下，基本的接收入口
Mail.prototype.stateRead = function (state, socket, data) {
    console.log("inside stateRead");
    if (!state.action) {
        console.log('inside stateReadHome');
        this.stateReadHome(state, socket, data);
    } else {
        console.log('inside stateReadHome else');
        switch (state.action) {
            case 'wait':
                console.log('inside wait');
                this.stateReadWait(state, socket, data);
                break;
        }
    }
}

Mail.prototype.stateReadHome = function (state, socket, data) {
    socket.write('\n++++++++++++++++++++++++++++++++++++++++');
    socket.write('\n请输入你要查看的邮件id: ');

    let mails = this.getMailList(socket);
    for (let i = 0; i < mails.length; i++) {
        socket.write("\nid: " + i + "，标题： " + mails[i].mail.title + "\n");
    }
    state.action = 'wait';
}

Mail.prototype.getMailList = function (socket) {
    let user = UserManager.getUserBySocket(socket);
    console.log('user');
    console.log(user);
    if (!user) {
        socket.write('# 你尚未登录');
        return;
    }
    let mails = MailManager.get(user.email);
    console.log("mails");
    console.log(mails);

    if (!mails || mails.length < 1) {
        socket.write('邮件列表为空！');
        return;
    }

    return mails;
}

Mail.prototype.stateReadWait = function (state, socket, data) {
    console.log('inside stateReadWait');
    let index = state.getCleanedString(socket, data);
    console.log("input = " + index);
    let mails = this.getMailList(socket);
    if (!mails) {
        return false;
    }
    try {
        if (index < mails.length && index >= 0) {
            let email = mails[index].mail;
            mails[index].read = true;
            let id = index;
            socket.write("\n=========================邮件详情=======================\n");
            socket.write("+ id: " + id + "\n");
            socket.write("+ 发送地址: " + email.sender + "\n");
            socket.write("+ 接收地址: " + email.receiver + "\n");
            socket.write("+ 标题: " + email.title + "\n");
            socket.write("\n=========================邮件内容=======================\n");
            socket.write(email.body);
            socket.write("\n\r");
            socket.write("\n=========================邮件结束=======================\n");
        } else {
            socket.write('\n# 输入的 id 无法处理或者超出范围');
        }
    } catch (e) {
        console.log(e.stack);
        console.log('on error parse');
    }
}

exports.Mail = Mail;