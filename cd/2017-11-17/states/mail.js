var debug = require('debug')('xxx');
let states = require('../states').states;
const UserManager = require('../entities/user').User;
const MailManager = require('../entities/mail').Mail;
/**
 * 用于处理邮件与用户的交互
 * @param {*} socket 
 */
function Mail(socket) {
  this.title = '';
  this.body = [];
  this.address = '';

  socket.on(states.MAIL_WRITE, (machine, socket, data) => {
    this.stateWrite(machine, socket, data);
  });

  socket.on(states.MAIL_READ, (machine, socket, data) => {
    this.stateRead(machine, socket, data);
  });

  socket.on(states.MAIL_NEW, (sender, mail) => {
    this.onNewMail(socket, sender, mail);
  });
}

/**
 * 邮件写状态下，基本的接收入口
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWrite = function (machine, socket, data) {
  debug('log:' +'state write');
  if (!machine.action) {
    debug('log:' +'state write home');
    this.stateWriteHome(machine, socket, data);
  } else {
    debug('log:' +'inside not login else');
    switch (machine.action) {
    case 'address':
      this.getAddress(machine, socket, data);
      break;
    case 'title':
      this.getTitle(machine, socket, data);
      break;
    case 'body':
      this.getBody(machine, socket, data);
      break;
    case 'wait':
      debug('log:' +'inside not login wait');
      this.stateWriteWait(machine, socket, data);
      break;
    }
  }
};

/**
 * 写邮件的主页面
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteHome = function (machine, socket) {
  socket.write('\n请输入你要修改的内容，\n\t1.收件人地址\n\t2.标题\n\t3.正文内容\n\t4.发送邮件\n');
  machine.action = 'wait';
};


/**
 * 主页面接收用户输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteWait = function (machine, socket, data) {
  debug('log:' +'state write');
  let input = machine.getCleanedString(socket, data);
  debug('log:' +'input = ' + input);
  switch (input) {
  case '1':
    this.stateWriteAddressWait(machine, socket, data);
    break;
  case '2':
    this.stateWriteTitleWait(machine, socket, data);
    break;
  case '3':
    this.stateWriteBodyWait(machine, socket, data);
    break;
  case '4':
    this.sendMail(machine, socket, data);
    break;
  case 'exit':
    machine.state = states.USER_LOGIN;
    machine.action = '';
    socket.emit(states.USER_LOGIN, machine, socket);
    break;
  default:
    debug('log:' +'inside not login wait default');
    break;
  }
};
/**
 * 写邮件时，接收地址输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteAddressWait = function (machine, socket) {
  socket.write('请输入接收用户的地址:\n');
  machine.action = 'address';
};


/**
 * 写邮件时，接收标题输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteTitleWait = function (machine, socket) {
  socket.write('请输入标题:\n');
  machine.action = 'title';
};

/**
 * 写邮件时，接收正文输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteBodyWait = function (machine, socket) {
  socket.write('请输入邮件内容:\n');
  machine.action = 'body';
};

Mail.prototype.getTitle = function (machine, socket, data) {
  this.title = machine.getCleanedString(socket, data);
  socket.write('标题更新成功！当前标题是: ' + this.title + '\n');
  this.stateWriteHome(machine, socket, data);
};

Mail.prototype.getAddress = function (machine, socket, data) {
  let address = machine.getCleanedString(socket, data);
  if (!UserManager.isAddress(address)) {
    socket.write('地址不存在！请重新输入:\n');
    return;
  }
  this.address = address;
  socket.write('地址更新成功！当前地址是: ' + this.address + '\n');
  this.stateWriteHome(machine, socket, data);
};

Mail.prototype.getBody = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  if (input === '.exit') {
    socket.write('正文更新成功！当前正文内容是:\n');
    for (let i = 0; i < this.body.length; i++) {
      socket.write(this.body[i] + '\n\r');
    }
    socket.write('===正文结束===\n');
    this.stateWriteHome(machine, socket, data);
  } else {
    this.body.push(input);
  }

};


Mail.prototype.sendMail = function (machine, socket) {
  let user = UserManager.getUserBySocket(socket);
  if (!MailManager.send(
    user.email,
    this.address,
    this.title,
    this.body.join('\n\r'))) {
    return socket.write('发送失败！\n');
  }
  return socket.write('邮件发送成功！\n');
};

Mail.prototype.onNewMail = function(socket, sender) {
  socket.write('你有来自<' + sender + '>的一封新邮件！\n');
};

/**
 * 邮件读状态下，基本的接收入口
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateRead = function (machine, socket, data) {
  debug('log:' +'state read');
  if (!machine.action) {
    debug('log:' +'state write home');
    this.stateReadHome(machine, socket, data);
  } else {
    debug('log:' +'inside not login else');
    switch (machine.action) {
    case 'wait':
      debug('log:' +'inside not login wait');
      this.stateWriteWait(machine, socket, data);
      break;
    }
  }
};

Mail.prototype.stateReadHome = function (machine, socket) {
  socket.write('\n请输入你要查看的邮件ID:\n');
  let user = UserManager.getUserBySocket(socket);
  debug('log:' +'user');
  debug('log:' +user);
  if (!user) {
    socket.write('你尚未登录!');
    return;
  }
  let mails = MailManager.get(user.email);
  debug('log:' +'mails');
  debug('log:' +mails);
    
  if (!mails || mails.length < 1) {
    socket.write('你邮件列表为空!');
    return; 
  }
  for(let i = 0; i < mails.length; i++) {
    socket.write('id: ' + i + ', 标题: ' + mails[i].mail.title + '\n');
  }
  machine.action = 'wait';
};

exports.Mail = Mail;