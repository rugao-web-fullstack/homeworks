const User = require('./user').User;
const fs = require('fs');
const filename = '../data/mail.json';

// let mails = {};
Mail.readJSON = function (filename,callback) {
        let data = [];
        const rs = fs.createReadStream(filename);
        rs.on('data',function (chunk) {
            data.push(chunk);
        });
        rs.on('end',function () {
            let json = String(Buffer.concat(data,data.length));
            callback(json);
        });
};

Mail.writeJSON = function (filename,json,callback) {
    const ws = fs.createWriteStream(filename);
    ws.on(JSON.stringify(json));
    ws.end();
    ws.on('finish',function () {
        callback(false);
    });

};

function Mail(sender, receiver, title, body) {
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.body = body;
}

Mail.send = function (sender, receiver, title, body) {
    let mails = this.readJSON(filename,);
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