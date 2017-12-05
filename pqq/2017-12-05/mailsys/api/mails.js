function Mail() {

}
Mail.prototype.send = function () {// debug('inside sendmail');
};
Mail.prototype.update = function () {// console.log('inside updatemail');
};
Mail.prototype.delete = function () {// console.log('inside deletemail');
};

exports.Mail = Mail;