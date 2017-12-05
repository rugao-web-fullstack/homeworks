let states = require('./states').states;
const UserManager = require('./usermanager').User;

function User(socket) {
  //一开始状态机的状态为user-not-login
  socket.on(states.USER_NOT_LOGIN, (machine, socket, data) => {
    this.stateNotLogin(machine, socket, data);
  });
  //如果状态机的状态变为user-login
  socket.on(states.USER_LOGIN, (machine, socket, data) => {
    this.stateLogin(machine, socket, data);
  });
}

User.prototype.stateNotLogin = function(machine, socket, data) {
  if (!machine.action) {
    this.notLoginHome(machine, socket, data);
  } else {
    switch (machine.action) {
    case 'register':
      this.register(machine, socket, data);
      break;
    case 'login':
      this.login(machine, socket, data);
      break;
    case 'wait':
      this.notLoginWait(machine, socket, data);
      break;
    }
  }
};

// 一开始action为0,进入下面的函数
User.prototype.notLoginHome = function(machine, socket) {
  socket.write('欢迎来到XXX邮件系统！请选择:\n\t1.用户注册\n\t2.用户登录\n');
  machine.action = 'wait';
};

//action为wait进入notLoginWait函数
User.prototype.notLoginWait = function(machine, socket, data) {
  let inputs = machine.getCleanedString(socket, data);
  switch (inputs) {
  case '1':
    this.registerWait(machine, socket, data);
    break;
  case '2':
    this.loginWait(machine, socket, data);
    break;
  default:
    break;
  }
};

// choose 1 to next function
User.prototype.registerWait = function(machine, socket) {
  socket.write('\n请输入注册邮箱和密码，格式： 邮箱 密码\n');
  machine.action = 'register';
};

// machine.action = "register"  go to register
User.prototype.register = function(machine, socket, data) {
  let inputs = machine.getCleanedString(socket, data);
  inputs = inputs.split(' ');
  if (inputs.length === 2) {
    if (UserManager.register(socket, inputs[0], inputs[1])) {
      socket.write('\n注册成功！\n');
      this.loginWait(machine, socket, data);
    } else {
      socket.write('\n用户已经存在！\n');
    }
  } else {
    socket.write('输入错误!');
  }
};

// choose 2 to next function
User.prototype.loginWait = function(machine, socket) {
  socket.write('\n请输入登录邮箱和密码，格式： 邮箱 密码\n');
  machine.action = 'login';
};

// machine.action = "login"  go to login
User.prototype.login = function(machine, socket, data) {
  let inputs = machine.getCleanedString(socket, data);
  inputs = inputs.split(' ');
  if (inputs.length === 2) {
    if (UserManager.login(socket, inputs[0], inputs[1])) {
      socket.write('\n登录成功！\n');
      //登录成功后状态机里面的状态变成user-login
      machine.state = states.USER_LOGIN;
      //action的值再次为空
      machine.action = '';
      machine.process(socket, data);
    } else {
      socket.write('\n用户名或者密码不匹配！\n');
    }
  } else {
    socket.write('输入错误!');
  }
};

//状态机的状态变为user-login
User.prototype.stateLogin = function(machine, socket, data) {
  if (!machine.action) {
    //一开始的action为空，执行loginHome函数
    this.loginHome(machine, socket, data);
  } else {
    switch (machine.action) {
    case 'wait':
      this.homeWaite(machine, socket, data);
      break;
    }
  }
};

User.prototype.loginHome = function(machine, socket) {
  socket.write('\n你已经成功登录邮件系统\n\t1.编写邮件\n\t2.查看邮件\n请输入：');
  machine.action = 'wait';
};

//action变成wait  执行homeWaite函数
User.prototype.homeWaite = function(machine, socket, data) {
  let inputs = machine.getCleanedString(socket, data);
  switch (inputs) {
  case '1':
    socket.write('mail write');
    //选择了写邮件之后，状态机里面的状态变成mail-write
    machine.state = states.MAIL_WRITE;
    //action值变为空
    machine.action = '';
    socket.emit(states.MAIL_WRITE, machine, socket, data);
    break;
  case '2':
    socket.write('mail read');
    //选择了读邮件之后，状态机里面的状态变成mail-read
    machine.state = states.MAIL_READ;
    //action值变为空
    machine.action = '';
    socket.emit(states.MAIL_READ, machine, socket, data);
    break;
  default:
    break;
  }
};

exports.User = User;
