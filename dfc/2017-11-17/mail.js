function Mail(event) {
  this.event = event;
  let self = this;
  this.event.on('send-mail', function (user, senduser, title, content, mail) {
    self.sendMail(user, senduser, title, content, mail);
  });
  this.event.on('read-maillist', function (user, mail) {
    self.readMailList(user, mail);
  });
  this.event.on('read-mailcontent', function (user, mail, count) {
    self.readMailContent(user, mail, count);
  });
}
Mail.prototype.sendMail = function (user, senduser, title, content, mail) {
  var date = new Date();
  date = date.toLocaleString();
  mail.push({
    'user' : user.username,
    'senduser' : senduser,
    'title': title,
    'content': content,
    'date': date
  });
  if(user.socket !== ''){
    user.socket.write('您收到一封邮件\n');
  }
};
Mail.prototype.readMailList = function (user, mail) {
  let count = 0;
  for (let i = 0; i < mail.length; i++) {
    if (user.username === mail[i].user) {
      count++;
      user.socket.write(count + '.标题：' + mail[i].title + '\t发件人:' + mail[i].senduser + '\t发送时间:' + mail[i].date + '\n');
    }
  }
  user.socket.write('\n');
};
Mail.prototype.readMailContent = function (user, mail, cho) {
  let flag = 0;
  for (let i = 0; i < mail.length; i++) {
    if (user.username === mail[i].user) {
      flag++;
      if (flag === cho) {
        user.socket.write(cho + '.标题：' + mail[i].title + '\t发件人:' + mail[i].senduser + '\t发送时间:' + mail[i].date + '\n');
        user.socket.write(mail[i].content + '\n');
        return;
      }
    }
  }
  user.socket.write('请输入正确的序号\n');
};
exports.Mail = Mail;