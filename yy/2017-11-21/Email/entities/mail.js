let states = require("../states").states;
const UserManager = require("./user").User;
const Storage = require("./storage").Storage;
const path = require("path");
const FILENAME = "../data/mail.json";
// 使用__dirname变量获取当前模块文件所在目录的完整绝对路径
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

function Mail(sender, receiver, title, body) {
	this.sender = sender;
	this.receiver = receiver;
	this.title = title;
	this.body = body;
}

Mail.send = function (socket, sender, receiver, title, body, cb) {
	storage.read((error, mails) => {
		if (error) {
			cb(error);
			return;
		}
		// 如果还没有任何邮件存在,新创建一个mails
		if (!mails) {
			mails = {};
		}
		// 如果mails里面还没有创建 接收的用户，则创建
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
			let receiverSocket;
			UserManager.getSocket(receiver, (error, rec) => {
				if (error) {
					socket.write("该用户不在线！");
					cb(error);
					return;
				}
				receiverSocket = rec;
				receiverSocket.emit(states.MAIL_NEW, sender, mail);
				cb(false);// error=false,相当于return true;
			});

		});
	});
};
// 此形参user就相当于是receiver
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