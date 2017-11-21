const User = require('./user').User;
let mails = {};

function Mail(sender, receiver, title, body) {
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.body = body;
}

Mail.send = function (sender, receiver, title, body) {
    if (!mails[receiver]) {
        mails[receiver] = [];
    }
    mails[receiver].push({
        read: false,
        receiver: new Mail(sender, receiver, title, body)
    });
    console.log(mails);
};
Mail.list = function (receiver) {
    return mails[receiver];
}
exports.Mail = Mail;