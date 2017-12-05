const userArr = require('./User');

function MainPage(socket) {
  socket.on('MainPage', function (username) {
    socket.write(username + '欢迎进入用户首页\n');
    socket.write('请选择以下指令执行\n');
    socket.write('1.发送\n2.查看\n3.退出系统\n');
    socket.on('data', function func(data) {
      data = data.toString().split('\r\n')[0];
      if (data == 1) {
        socket.removeListener('data', func);
        socket.emit('SendMail', username);
      } else if (data == 2) {
        socket.removeListener('data', func);
        socket.emit('ReadMail', username);
      } else if (data == 3) {
        socket.removeListener('data', func);
        socket.end('退出系统');
        //---退出时,要将online设置为false,同时将socket设置为null
        for (let i = 0; i < userArr.length; i++) {
          if (userArr[i]['username'] === username) {
            userArr[i]['online'] = false;
            userArr[i]['socket'] = null;
          }
        }
      }
    });
  });
}

module.exports = MainPage;