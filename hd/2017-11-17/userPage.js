let userArr = require('./user.js');

function userPage(socket) {
  //注册userPage事件
  socket.on('userPage', (userName) => {
    socket.write('\n欢迎来到邮件服务系统\n\t1.发送邮件\n\t2.查看邮件\n\t3.退出登录\n请输入：');
    socket.on('data', function fn(data) {
      data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, '');
      if (data == '1') {
        socket.removeListener('data', fn);
        socket.emit('sendMail', userName);
      } else if (data == '2') {
        socket.removeListener('data', fn);
        socket.emit('readMail', userName);
      } else if (data == '3') {
        userArr[userName].offline(); //用户下线
        socket.removeListener('data', fn);
        socket.emit('mainPage');
      }
    });
  });

}

module.exports = userPage;