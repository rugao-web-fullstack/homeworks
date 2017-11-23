let states = require("../states").states;
const path = require("path");
const UserManager = require('./user').User;


// 创建Storage，也就是加载或者保存的对象
const FILENAME = "../data/mail.json";

const Storage = require("./storage").Storage;
const storage = new Storage(
    path.resolve(
        path.dirname(__filename), FILENAME));
//

function Mail(sender, receiver, title, body) {
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.body = body;
}

Mail.send = function (sender, receiver, title, body, cb) {
    console.log("inside send")
    storage.read((error, mails) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }

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
            let receiverSocket = UserManager.getSocket(receiver)
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