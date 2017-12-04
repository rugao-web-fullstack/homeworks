function User(username, password) {
  this.username = username;
  this.password = password;
  this.load = false;
  this._socket = null;
  this.mail = [];
}

//判断用户是否在线
User.prototype.isOnline = function () {
  return this.load;
};
//用户上线
User.prototype.online = function (socket) {
  this._socket = socket;
  this.load = true;
};
//用户下线
User.prototype.offline = function () {
  this._socket = null;
  this.load = false;
};
//用户收到信息
User.prototype.reciveMessage = function (msg) {
  if (this.isOnline()) {
    this._socket.write(msg);
  }
};
//用户收到信息邮件
User.prototype.reciveMail = function (sender, mailMessage) {
  var obj = {};
  obj.sender = sender;
  obj.mailMessage = mailMessage;
  obj.time = new Date().toLocaleString();
  this.mail.push(obj);
};


//所有用户列表
let UserArr = {};

//判断是否存在用户
UserArr.checkUser = function (username, password) {
  if (UserArr[username] && UserArr[username].password == password) {
    return true;
  } else {
    return false;
  }
};
//添加用户
UserArr.addUser = function (username, password) {
  if (!UserArr[username]) {
    UserArr[username] = new User(username, password);
    return true;
  } else {
    return false;
  }
};
//删除用户
UserArr.delUser = function (username) {
  if (UserArr[username]) {
    delete UserArr[username];
  }
};

module.exports = UserArr;