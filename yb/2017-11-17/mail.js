var debug = require('debug')('xxx');
function Mail(event) {
  this.event = event;
  debug('log:' +'mail: constructor');
  let self = this;
  this.event.on('send_mails', function (user, senduser, title, content, mail) {
    self.sendMail(user, senduser, title, content, mail);
  });
  this.event.on('read_mails', function (user, mail) {
    self.readMailList(user, mail);
  });
  this.event.on('read_mailscontent', function (user, mail, count) {
    self.readMailContent(user, mail, count);
  });
}
Mail.prototype.sendMail = function (user, senduser, title, content, mail) {
  var date;
  date = new Date();
  date = date.toLocaleString();
  mail.push({
    'user': user.username,
    'senduser': senduser,
    'title': title,
    'content': content,
    'date': date
  });
  if (user.socket !== '') {
    user.socket.write('请注意，您收到了一封邮件！\n');
  }
};
Mail.prototype.readMailList = function (user, mail) {
  let count = 0;
  for (let i = 0; i < mail.length; i++) {
    if (user.username === mail[i].user) {
      count++;
      user.socket.write(count + '.\n标题:' + mail[i].title + '\t发件人：' + mail[i].senduser + '\t发送时间' + mail[i].date + '\n');
    }
  }
  user.socket.write('\n');
};
Mail.prototype.readMailContent = function (user, mail, cho) {
  let flag = 0;
  for (let i = 0; i < mail.length; i++) {
    if (user.username === mail[i].user) {
      debug('log:' +mail);
      flag++;
      if (flag === cho) {
        user.socket.write(cho + '.\n标题:' + mail[i].title + '\t发件人：' + mail[i].senduser + '\t发送时间' + mail[i].date + '\n');
        user.socket.write('正文：' + mail[i].content + '\n');
        return ;
      }
    }
  }
  user.socket.write('请输入正确的序号！' + '\n');
};

exports.Mail = Mail;