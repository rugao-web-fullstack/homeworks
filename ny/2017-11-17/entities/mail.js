const User = require("./user").User;
let mails = {

};


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
};

Mail.write = function (socket, sender, receiver, title, body) {
    if (!User.isReceiverExist()) {
        return false;
    }
    Mail.addMail(receiver, title, body);
    return true;
};

// Mail.read = function (socket, receiver) {

//     if (!User.isOwn(socket, receiver)) {
//         return false;
//     }
//     return mails[receiver];
// };

Mail.list = function (receiver) {
    return mails[receiver];
};

exports.Mail = Mail;