let userArr = require('./user.js');

function sendMail(socket) {
  //注册sendMail事件
  socket.on('sendMail', (sendName) => {
    socket.write('\n请输入接受方邮件地址和内容,用空格分割:\n');
    socket.on('data', function fn(data) {
      data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, '');

      let reciveName = data.split(' ')[0];
      let message = data.split(' ').slice(1).join(' ');

      //用户存在，用户在线
      if (userArr[reciveName] && userArr[reciveName].isOnline()) {
        userArr[reciveName].reciveMessage('\n' + sendName + '发来一封邮件！\n');
        userArr[reciveName].reciveMail(sendName, message);
        socket.write('\n消息发送成功!\n');
        socket.removeListener('data', fn);
        socket.emit('userPage', sendName);
      } else {
        socket.removeListener('data', fn);
        socket.write('不存在此用户或用户不在线!\n');
        socket.emit('userPage', sendName);
      }
    });
  });

}

module.exports = sendMail;