let states = require('../states').states;
const path = require('path');
const UserManager = require('./user').User;
const Storage = require('./storage').Storage;
const FILENAME = '../data/mail.json';
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));
var debug = require('debug')('ago');
//let mails = {};

function Mail(sender, receiver, title, body) {
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.body = body;
}

Mail.send = function(sender, receiver, title, body, cb) {
    storage.read((error, mails) => {
        if (error) {
            debug(error.stack);
            cb(error);
            return;
        }
        if (!mails) {
            mails = {};
        }
        if (!mails[receiver]) {
            mails[receiver] = []; //初始化为数组
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
        });
    });
};

Mail.get = function(user, cb) {
    storage.read((error, mails) => {
        if (error) {
            cb(error);
            return;
        }
        return cb(false, mails[user]);
    });

};

exports.Mail = Mail;
