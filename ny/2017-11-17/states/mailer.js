let MailManager = require('../entities/mail').Mail;
let UserManager = require('../entities/user').User;

let Mailer = function (socket) {
    this.title = "";
    this.address = "";
    this.body = [];

    socket.on("mail-write", (state, socket, data) => {
        console.log("inside mail write");
    state.state = 'mail-write';
    this.stateWrite(state, socket, data)
});
    socket.on("mail-read", (state, socket, data) => {
        console.log("inside mail read");
    state.state = 'mail-read';
    this.stateRead(state, socket, data)
});

    socket.on("mail-new", (sender, mail) => {
        console.log("inside mail new");
    socket.write("你收到一封来自(" + sender.username + ")<" + sender.email + ">的信!\n");
});
}

Mailer.prototype.waitWrite = function (state, socket, data) {
    console.log("inside wait write");
    let input = state.getCleanedString(socket, data);
    console.log('input')
    switch (input) {
        case '1':
            socket.write('\n请输入接收人的地址：\n');
            state.action = 'address';
            break;
        case '2':
            socket.write('\n请输入标题：\n');
            state.action = 'title';
            break;
        case '3':
            socket.write('\n请输入正文：\n');
            state.action = 'body';
            break;
        case '4':
            console.log("正在发送邮件...");
            this.sendMail(state, socket, data);
            break;
        case 'exit':
            socket.emit('user-home', state, socket, data);
            break;
        default:
            socket.write('\n输入错误!\n');
            break;

    }
};

Mailer.prototype.getTitle = function (state, socket, data) {
    this.title = state.getCleanedString(socket, data);
    socket.write('\n邮件标题更新成功！更新为:' + this.title + '\n');
    state.action = 'wait';
    this.idleWrite(state, socket, data);
};

Mailer.prototype.getAddress = function (state, socket, data) {
    this.address = state.getCleanedString(socket, data);
    socket.write('\n邮件地址更新成功！更新为:' + this.title + '\n');
    state.action = 'wait';
    this.idleWrite(state, socket, data);
}

Mailer.prototype.getBody = function (state, socket, data) {
    let cmd = state.getCleanedString(socket, data);
    if (cmd === '.exit') {
        socket.write('\n邮件编写完成！\n');
        socket.write('\当前邮件内容为：\n');
        for (let i = 0; i < this.body.length; i++) {
            socket.write(this.body[i]);
        }
        state.action = 'wait';
        this.idleWrite(state, socket, data);
    } else {
        this.body.push(cmd);
    }
}

Mailer.prototype.sendMail = function (state, socket, data) {
    console.log(this.title);
    console.log(this.address);
    console.log(this.body);

    if (this.title && this.address && this.body.length > 0) {
        console.log('inside sending emails');

        let receiver = UserManager.getByEmail(this.address);
        if (!receiver) {
            socket.write('\n发送失败，接收地址不存在！\n');
            return;
        }
        let sender = UserManager.getBySocket(socket);
        if (!sender) {
            socket.write('\n发送失败，当前用户信息无法找到！\n');
            return;
        }
        MailManager.send(sender.user.email, this.address, this.title, this.body.join("\n\r"));
        socket.write('\n发送成功！\n');
        state.action = "wait";
        if (receiver.socket) {
            receiver.socket.emit("mail-new", sender.user, this);
        }


    }
}

Mailer.prototype.idleWrite = function (state, socket, data) {
    console.log("idel write");
    socket.write('\n请输入你要修改的内容，\n\t1.收件人地址\n\t2.标题\n\t3.正文内容\n\t4.发送邮件\n');
    state.state = 'mail-write';
    state.action = 'wait';
};

Mailer.prototype.idleRead = function (state, socket, data) {
    state.state = 'mail-read';
    state.action = 'wait';
    let user = UserManager.getBySocket(socket);
    if (!user || !user.user) {
        socket.write('\用户尚未登录!\n');
        return;
    }
    let emails = MailManager.list(user.user.email);
    if (!emails || emails.length < 1) {
        socket.write('\邮件列表为空！\n');
        return;
    }
    socket.write('\邮件列表:\n');
    for (let i = 0; i < emails.length; i++) {
        console.log(emails[i]);
        let status = emails[i].read ? "已读" : "未读";
        socket.write("id: " + i + ", 状态: " + status + ", 标题: " + emails[i].receiver.title + "\n");
    }
    socket.write('\n请输入你要读取的邮件id:\n');
    console.log("idel read");

};

Mailer.prototype.stateWrite = function (state, socket, data) {
    console.log("state write");
    console.log("this.action === " + state.action);
    console.log(state.state);
    if (!state.action) {
        this.idleWrite(state, socket, data);
    } else {
        let cmd = state.getCleanedString(socket, data);
        console.log("cmd = " + cmd);
        if (cmd === 'exit') {
            if (state.action === 'wait') {
                state.state = 'user-home';
                state.action = '';
                socket.emit('user-home', state, socket, data);
                return;
            }
            state.action = '';
            this.idleWrite(state, socket, data);
            return;
        }
        switch (state.action) {
            case 'title':
                this.getTitle(state, socket, data)
                break;
            case 'address':
                this.getAddress(state, socket, data);
                break;
            case 'body':
                this.getBody(state, socket, data);
                break;
            case 'wait':
                console.log("inside wait");
                this.waitWrite(state, socket, data);
                break;

        }
    }
};

Mailer.prototype.stateRead = function (state, socket, data) {
    console.log("state read");
    console.log("this.action === " + state.action);
    console.log(state.state);
    if (!state.action) {
        this.idleRead(state, socket, data);
    } else {
        let cmd = state.getCleanedString(socket, data);
        console.log("cmd = " + cmd);
        if (cmd === 'exit') {
            console.log("inside exit")
            state.state = 'user-home';
            state.action = '';
            socket.emit('user-home', state, socket, data);
            return;
        }
        try {
            let id = parseInt(cmd);
            let user = UserManager.getBySocket(socket);
            let emails = MailManager.list(user.user.email);
            if (!emails || emails.length < 1) {
                socket.write('\邮件列表为空！\n');
                return;
            }
            if (id >= emails.length) {
                socket.write('\ID超出范围！\n');
                return;
            }
            if (id < 0) {
                socket.write('\ID必须大于等于0！\n');
                return;
            }

            let email = emails[id].receiver;
            emails[id].read  = true;

            socket.write("\n=========================邮件详情=======================\n");
            socket.write("id: " + id + "\n");
            socket.write("发送地址: " + email.sender + "\n");
            socket.write("接收地址: " + email.receiver + "\n");
            socket.write("标题: " + email.title + "\n");
            socket.write("内容详情:\n");
            socket.write("\n=========================邮件内容=======================\n");
            socket.write(email.body);
            socket.write("\n\r");
            socket.write("\n=========================邮件结束=======================\n");

        } catch (e) {
            console.log(e.stack);
            socket.write("输入必须是整数id!\n");
        }
    }
};

exports.Mailer = Mailer;