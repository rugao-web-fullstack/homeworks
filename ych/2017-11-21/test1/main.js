var debug = require('debug')('mail');
let states = require('../states').states;
const UserManager = require('../entities/user').User;

function User(socket) {
  socket.on(states.USER_NOT_LOGIN,
    (machine, socket, data) => {
      this.stateNotLogin(machine, socket, data);
    });
  socket.on(states.USER_LOGIN,
    (machine, socket, data) => {
      this.stateLogin(machine, socket, data);
    });
}

User.prototype.notLoginHome = function (machine, socket) {
  debug('inside user not login');
  socket.write('欢迎来到XXX邮件系统！请选择:\n\t1.用户注册\n\t2.用户登录\n');
  machine.action = 'wait';
};

User.prototype.login = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  input = input.split(' ');
  if (input.length === 2) {
    // User Register
    if (UserManager.login(socket, input[0], input[1])) {
      socket.write('\n登录成功！\n');
      machine.state = states.USER_LOGIN;
      machine.action = '';
      machine.process(socket, data);
      // socket.emit(states.USER_LOGIN, state, socket, null);
    } else {
      socket.write('\n用户名或者密码不匹配！\n');
    }
  } else {
    socket.write('输入错误!');
  }
};

User.prototype.notLoginWait = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  debug('input = ' + input);
  switch (input) {
  case '1':
    debug('inside not login wait 1');
    this.registerWait(machine, socket, data);
    break;
  case '2':
    debug('inside not login wait 2');
    this.loginWait(machine, socket, data);
    break;
  default:
    debug('inside not login wait default');
    break;
  }
};

User.prototype.stateNotLogin = function (machine, socket, data) {
  debug('inside not login');
  if (!machine.action) {
    debug('inside not login home');
    this.notLoginHome(machine, socket, data);
  } else {
    debug('inside not login else');
    switch (machine.action) {
    case 'register':
      this.register(machine, socket, data);
      break;
    case 'login':
      debug('inside login');
      this.login(machine, socket, data);
      break;
    case 'wait':
      debug('inside not login wait');
      this.notLoginWait(machine, socket, data);
      break;
    }
  }
};

User.prototype.registerWait = function (machine, socket) {
  socket.write('\n请输入注册邮箱和密码，格式： 邮箱 密码\n');
  machine.action = 'register';
};

User.prototype.loginWait = function (machine, socket) {
  socket.write('\n请输入登录邮箱和密码，格式： 邮箱 密码\n');
  machine.action = 'login';
};

User.prototype.register = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  input = input.split(' ');
  if (input.length === 2) {
    // User Register
    if (UserManager.register(socket, input[0], input[1])) {
      socket.write('\n注册成功！\n');
      this.loginWait(machine, socket, data);
    } else {
      socket.write('\n用户已经存在！\n');
    }
  } else {
    socket.write('输入错误!');
  }
};

User.prototype.stateLogin = function (machine, socket, data) {
  debug('inside login');
  if (!machine.action) {
    debug('inside not login home');
    this.loginHome(machine, socket, data);
  } else {
    debug('inside not login else');
    switch (machine.action) {
    case 'wait':
      debug('inside not login wait');
      this.homeWaite(machine, socket, data);
      break;
    }
  }
};

User.prototype.loginHome = function (machine, socket) {
  socket.write('\n你已经成功登录邮件系统\n\t1.编写邮件\n\t2.查看邮件\n请输入：');
  machine.action = 'wait';
};
User.prototype.homeWaite = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  debug('input = ' + input);
  switch (input) {
  case '1':
    debug('inside mail write');
    socket.write('mail write');
    machine.state = states.MAIL_WRITE;
    machine.action = '';
    socket.emit(states.MAIL_WRITE, machine, socket, data);
    break;
  case '2':
    debug('inside mail write');
    socket.write('mail read');
    machine.state = states.MAIL_READ;
    machine.action = '';
    socket.emit(states.MAIL_READ, machine, socket, data);
    break;
  default:
    debug('inside not login wait default');
    break;
  }
};

exports.User = User;
var fs = require('fs');
var ws = fs.createWriteStream('demo.txt');
var rs = fs.createReadStream('demo.txt');

var writeBuff = Buffer.alloc(22);
writeBuff.writeUInt32BE(100, 0);
writeBuff.writeInt32BE(-100, 4);
writeBuff.writeUInt8(100, 8);
writeBuff.writeInt8(-100, 9);
writeBuff.writeFloatBE(88.88, 10);
writeBuff.writeDoubleBE(-888.888, 14);

var readBuff = [];

ws.end(writeBuff, function () {
  debug('文件写入完成!');

  rs.on('readable', function () {
    var data = rs.read();
    if (data) {
      readBuff.push(data);
    }
  });

  rs.on('end', function () {
    readBuff = Buffer.concat(readBuff);
    debug('从文件中读取出来的值为：');
    debug('UInt32 = ' + readBuff.readInt32BE(0));
    debug('Int32 = ' + readBuff.readInt32BE(4));
    debug('UInt8 = ' + readBuff.readUInt8(8));
    debug('Int8 = ' + readBuff.readInt8(9));
    debug('Float = ' + readBuff.readFloatBE(10));
    debug('Double = ' + readBuff.readDoubleBE(14));
  });

});
