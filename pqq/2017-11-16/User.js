//模块---外部调用
var debug = require('debug')('xxx');

function User(event){
  this.event=event;
  debug('用户请求注册');
}

User.prototype.register=function(name,pwd,email){
  this.name=name;
  this.pwd=pwd;
  this.email=email;
};

//抛出模块
exports.User = User;

