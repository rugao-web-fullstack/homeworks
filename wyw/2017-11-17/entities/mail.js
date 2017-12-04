let states = require('../states').states;
const UserManager = require('./user').User;
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
	let mail = new Mail(sender, receiver, title, body);

	mails[receiver].push({
		read: false,
		mail: mail
	});

	let receiverSocket = UserManager.getSocket(receiver);
	receiverSocket.emit(states.MAIL_NEW, sender, mail);
	return true;
};

Mail.get = function(user) {
	return mails[user];
};

exports.Mail = Mail;