var debug = require('debug')('message');
function Message(event, userArr) {
  var $this = this;
  this.event = event;
  debug('创建message对象');
  //事件监听
  this.event.on('register', function (user) {
    debug('register事件触发');
    var x = $this.email(user);
    userArr.splice(0, 1);
    userArr.push(x);
  });
}

Message.prototype.email = function (user) {
  var msg = ('用户名:' + user.username + ' 密码:' + user.password + ' 邮箱:' + user.email);
  return msg;

};
exports.Message = Message;
