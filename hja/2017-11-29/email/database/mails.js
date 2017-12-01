var insert = require('./insertmail');
function Mail(sender, receiver, title, body, date) {
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.body = body;
    this.date = date;
}

let MailsList = {};

//发送---增加
MailsList.sendMail = function (sender, receiver, title, body, cb) {
    insert(receiver, sender, title, body, function (err) {
        if (err) {
            cb(true);
            return;
        }
        cb(false);
        return;

    });

}

module.exports.Mails = MailsList;