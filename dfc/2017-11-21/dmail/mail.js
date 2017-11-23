const fs = require('fs');
const filename = "./fileMails.json";
const path = require('path');
const Storage = require('./storage').Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), filename));

function Mail(event) {
    this.event = event;
    console.log('mail: constructor');
    let self = this;
    this.event.on("send-mail", function (user, senduser, title, content, mail) {
        self.sendMail(user, senduser, title, content, mail);
    });
    this.event.on("read-maillist", function (user, mail) {
        self.readMailList(user, mail);
    });
    this.event.on("read-mailcontent", function (user, mail, count) {
        self.readMailContent(user, mail, count);
    });
}
Mail.prototype.sendMail = function (user, senduser, title, content, mails) {
    storage.read((error, mails) => {
        if (error) {
            console.error(error.stack);
            return;
        }

        date = new Date();
        date = date.toLocaleString();
        mails.push({
            'user': user.username,
            'senduser': senduser,
            'title': title,
            'content': content,
            'date': date
        });
        storage.save(mails, (error) => {
            if (error) {
                console.error(error.stack);
                socket.write("发送失败！\n");
                return;
            }
            if (user.socket !== '') {
                user.socket.write('您收到一封邮件\n');
            }
        })
    }, mails);
}
Mail.prototype.readMailList = function (user, mail) {
    storage.read((error, mail) => {
        if (error) {
            console.log(error.stack);
            return;
        }
        let count = 0;
        for (let i = 0; i < mail.length; i++) {
            if (user.username === mail[i].user) {
                count++;
                user.socket.write(count + '.标题：' + mail[i].title + '\t发件人:' + mail[i].senduser + '\t发送时间:' + mail[i].date + '\n');
            }
        }
        user.socket.write('\n');
    }, mail);

}
Mail.prototype.readMailContent = function (user, mail, cho) {
    storage.read((error, mail) => {
        if (error) {
            console.log(error.stack);
            return;
        }
        let flag = 0;
        for (let i = 0; i < mail.length; i++) {
            if (user.username === mail[i].user) {
                flag++;
                if (flag === cho) {
                    user.socket.write(cho + '.标题：' + mail[i].title + '\t发件人:' + mail[i].senduser + '\t发送时间:' + mail[i].date + '\n');
                    user.socket.write(mail[i].content + '\n');
                    return;
                }
            }
        }
        user.socket.write('请输入正确的序号\n');
    }, mail);
}
exports.Mail = Mail;