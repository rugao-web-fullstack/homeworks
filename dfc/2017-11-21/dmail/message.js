function Message(event) {
  this.event = event;
  let self = this;
  this.event.on('user-register', function (socket, flag) {
    self.onUserRegister(socket, flag);
  });
  this.event.on('user-login', function (socket, flag) {
    return self.onUserLogin(socket, flag);
  });
}

Message.prototype.onUserRegister = function (socket, flag) {
  if (flag) {
    socket.write('恭喜你注册成功\n');
  } else {
    socket.write('该账号已被注册，请重新输入账号密码\n');
  }
};

Message.prototype.onUserLogin = function (socket, flag) {
  if (flag) {
    socket.write('登录成功\n');
  } else {
    socket.write('密码错误\n');
  }
};

exports.Message = Message;