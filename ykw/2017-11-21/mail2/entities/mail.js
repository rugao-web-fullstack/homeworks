let states = require("../states").states;
const path = require("path");
const UserManager = require('./user').User;


// 创建Storage，也就是加载或者保存的对象
const FILENAME = "../data/mail.json";

const Storage = require("./storage").Storage;
const storage = new Storage(
    //把FILENAME路径解析添加到path.dirname(__filename)路径下 Demo/data/mail.json
    //path.dirname(__filename)：返回这个js文件的上一级
    path.resolve(
        path.dirname(__filename), FILENAME));
//

function Mail(sender, receiver, title, body) {
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.body = body;
}

//发送邮件
Mail.send = function (sender, receiver, title, body, cb) {
    console.log("inside send")
    //发送邮件前先读取邮件文件，然后在把信息保存进去
    storage.read((error, mails) => {
        //如果文件读取失败
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }
        //mails（读出的数据，是个json对象），如果mails为空，就新建一个空的json对象
        if (!mails) {
            mails = {};
        }

        if (!mails[receiver]) {
            mails[receiver] = [];
        }

        let mail = new Mail(sender, receiver, title, body);

        mails[receiver].push({
            read: false,
            mail: mail
        });

        storage.save(mails, (error) => {
            if (error) {
                cb(error);
                return;
            }
            let receiverSocket = UserManager.getSocket(receiver);
            receiverSocket.emit(states.MAIL_NEW, sender, mail);
            cb(false);
        })
    });
};

Mail.get = function (user, cb) {
    storage.read((error, mails) => {
        if (error) {
            cb(error);
            return;
        }
        return cb(false, mails[user]);
    });

};

exports.Mail = Mail;