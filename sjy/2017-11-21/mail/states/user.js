var debug = require('debug')('xxx');
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
  debug('log' + 'inside user not login');
  socket.write('欢迎来到XXX邮件系统！请选择:\n\t1.用户注册\n\t2.用户登录\n');
  machine.action = 'wait';
};

User.prototype.login = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  input = input.split(' ');
  if (input.length === 2) {
    UserManager.login(socket, input[0], input[1], function (error) {
      if (error) {
        socket.write('登陆失败\n');
        return;
      }
      socket.write('登录成功\n');
      machine.state = states.USER_LOGIN;
      machine.action = '';
      machine.process(socket, data);
    });
  } else {
    socket.write('输入错误!');
  }
};

User.prototype.notLoginWait = function (machine, socket, data) {
  let input = machine.getCleanedString(socket, data);
  debug('log' + 'input = ' + input);
  switch (input) {
  case '1':
    debug('log' + 'inside not login wait 1');
    this.registerWait(machine, socket, data);
    break;
  case '2':
    debug('log' + 'inside not login wait 2');
    this.loginWait(machine, socket, data);
    break;
  default:
    debug('log' + 'inside not login wait default');
    break;
  }
};

User.prototype.stateNotLogin = function (machine, socket, data) {
  debug('log' + 'inside not login');
  if (!machine.action) {
    debug('log' + 'inside not login home');
    this.notLoginHome(machine, socket, data);
  } else {
    debug('log' + 'inside not login else');
    switch (machine.action) {
    case 'register':
      this.register(machine, socket, data);
      break;
    case 'login':
      debug('log' + 'inside login');
      this.login(machine, socket, data);
      break;
    case 'wait':
      debug('log' + 'inside not login wait');
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
  let $this = this;
  let input = machine.getCleanedString(socket, data);
  input = input.split(' ');
  if (input.length === 2) {
    UserManager.register(socket, input[0], input[1], function (error) {
      if (error) {
        socket.write('注册失败\n');
        return;
      }
      socket.write('注册成功!\n');
      $this.loginWait(machine, socket, data);
    });
  } else {
    socket.write('输入错误!\n');
  }
};

User.prototype.stateLogin = function (machine, socket, data) {
  debug('log' + 'inside login');
  if (!machine.action) {
    debug('log' + 'inside not login home');
    this.loginHome(machine, socket, data);
  } else {
    debug('log' + 'inside not login else');
    switch (machine.action) {
    case 'wait':
      debug('log' + 'inside not login wait');
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
  debug('log' + 'input = ' + input);
  switch (input) {
  case '1':
    debug('log' + 'inside mail write');
    socket.write('mail write');
    machine.state = states.MAIL_WRITE;
    machine.action = '';
    socket.emit(states.MAIL_WRITE, machine, socket, data);
    break;
  case '2':
    debug('log' + 'inside mail write');
    socket.write('mail read');
    machine.state = states.MAIL_READ;
    machine.action = '';
    socket.emit(states.MAIL_READ, machine, socket, data);
    break;
  default:
    debug('log' + 'inside not login wait default');
    break;
  }
};

exports.User = User;