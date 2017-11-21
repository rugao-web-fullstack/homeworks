const UserMannager = require('./Man/user').User;
const MailManager = require('./Man/Mail').Mail;
let Mailer = function (socket) {
    this.title = '';
    this.address = '';
    this.body = [];
    var $this = this;

    socket.on('email-write', function (state, socket, data) {
        console.log('进入编写邮件\n');
        state.state = 'email-write';
        $this.stateWrite(state, socket, data);
    });
    socket.on('email-read', function (state, sicket, data) {
        console.log('进入阅读邮件\n');
        state.state = 'email-read';
        $this.stateRead(state, socket, data);
    });
    socket.on('email-new', function (sender, mail) {
        console.log('新消息\n');
        socket.write('你收到一封来自' + sender.username + ' ' + sender.email + '的信\n');
    });
};

Mailer.prototype.idleWrite = function (state, socket, data) {
    socket.write('请选择您要输入的内容\n\t1.收件人地址\n\t2.标题\n\t3.内容\n\t4.发送\n');
    state.action = 'wait';
    state.state = 'email-write';
};
Mailer.prototype.stateWrite = function (state, socket, data) {
    if (!state.action) {
        this.idleWrite(state, socket, data);
    } else {
        let cmd = state.getCleaningString(socket, data);
        if (cmd === 'exit') {
            if (state.action = 'wait') {
                state.state === 'user-home';
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
                this.getTitle(state, socket, data);
                break;
            case 'address':
                this.getAddress(state, socket, data);
                break;
            case 'body':
                this.getBody(state, socket, data);
                break;
            case 'wait':
                this.waitWrite(state, socket, data);
                break;
        }
    }
};
Mailer.prototype.waitWrite = function (state, socket, data) {
    let input = state.getCleaningString(socket, data);
    switch (input) {
        case '1':
            socket.write('\n请输入收件人地址\n');
            state.action = 'address';
            break;
        case '2':
            socket.write('\n请输入标题\n');
            state.action = 'title';
            break;
        case '3':
            socket.write('\n请输入正文\n');
            state.action = 'body';
            break;
        case '4':
            socket.write('\n正在发送\n');
            this.sendMail(state, socket, data);
            break;
        case 'exit':
            socket.emit('user-home', state, socket, data);
            break;
        default:
            socket.write('\n指令错误,请重新输入\n');
            break;
    }
};
Mailer.prototype.getAddress = function (state, socket, data) {
    this.address = state.getCleaningString(socket, data);
    socket.write('\n邮件地址更新成功\n');
    state.action = 'wait';
    this.idleWrite(state, socket, data);
};
Mailer.prototype.getTitle = function (state, socket, data) {
    this.title = state.getCleaningString(socket, data);
    socket.write('\n邮件地址更新成功\n');
    state.action = 'wait';
    this.idleWrite(state, socket, data);
};
Mailer.prototype.getBody = function (state, socket, data) {
    let cmd = state.getCleaningString(socket, data);
    if (cmd === '.exit') {
        socket.write('\n邮件编写完成\n');
        socket.write('当前邮件内容为:\n');
        for (let i = 0; i < this.body.length; i++) {
            socket.write(this.body[i] + '\n');
        }
        state.action = 'wait';
        this.idleWrite(state, socket, data);
    } else {
        this.body.push(cmd);
    }
};
Mailer.prototype.sendMail = function (state, socket, data) {
    if (this.title && this.address && this.body.length > 0) {
        let receiver = UserMannager.getByEmail(this.address);
        if (!receiver) {
            socket.write('\n所要发送的对象地址不存在\n');
            return;
        }
        let sender = UserMannager.getBySocket(socket);
        if (!sender) {
            socket.write('\n发送失败，你可能不存在\n');
            return;
        }
        MailManager.send(sender.user.email, this.address, this.title, this.body.join('\n\r'));
        socket.write('\n发送成功\n');
        state.action = 'wait';
        if (receiver.socket) {
            receiver.socket.emit('email-new', sender.user, this);
        }
    }

};
Mailer.prototype.idleRead = function (state, socket, data) {
    state.state = 'email-read';
    state.action = 'wait';
    let user = UserMannager.getBySocket(socket);
    if (!user || !user.user) {
        socket.write('\n尚未登录,你可能不存在\n');
        return;
    }
    let emails = MailManager.list(user.user.email);
    if (!emails || emails.length < 1) {
        socket.write('邮件列表为空\n');
        return;
    }
    socket.write('\n邮件列表\n');
    for (let i = 0; i < emails.length; i++) {
        let status = emails.read ? "已读" : "未读";
        socket.write('id:' + i + ',状态:' + status + ',标题:' + emails[i].receiver.title + '\n');
    }
    socket.write('\n请输入你要读取的邮件id\n');
    console.log(state.action);


};
Mailer.prototype.stateRead = function (state, socket, data) {
    console.log('stateRead');
    if (!state.action) {
        this.idleRead(state, socket, data);
    } else {
        let cmd = state.getCleaningString(socket, data);
        if (cmd === 'exit') {
            state.state = 'user-home';
            state.action = '';
            socket.emit('user-home', state, socket, data);
            return;
        }
        try {

            var id = parseInt(cmd);
            var user = UserMannager.getBySocket(socket);
            var emails = MailManager.list(user.User.username);
            console.log(id + ' ' + user + ' ' + user.User.username);
            if (!emails || emails.length < 1) {
                socket.write('\n邮件列表为空\n');
                return;
            }
            if (id >= emails.length) {
                socket.write('\n超出范围\n');
                return;
            }
            if (id < 0) {
                socket.write('\nid必须大于等于0\n');
                return;
            }
            let email = emails[id].receiver;
            emails[id].read = true;

            socket.write('\n------------------\n');
            socket.write('id:' + id + '\n');
            socket.write('发送地址:' + email.sender + '\n');
            socket.write('接收地址:' + email.receiver + '\n');
            socket.write('标题:' + email.title + '\n');
            socket.write('\n==========内容详情==========\n');
            socket.write(email.body + '\n');
            socket.write('\n\r');
            socket.write('\n==========阅读结束===========\n');

        } catch (e) {
            socket.write('输入错误\n');
        }
    }
};
exports.Mailer = Mailer;