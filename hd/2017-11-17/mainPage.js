function mainPage(socket) {
  //注册mainpage事件
  socket.on('mainPage', () => {
    socket.write('\n欢迎来到邮件服务系统\n\t1.登陆\n\t2.注册\n请输入：');
    socket.on('data', function fn(data) {
      data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, '');
      if (data == '1') {
        socket.removeListener('data', fn);
        socket.emit('login');
      } else if (data == '2') {
        socket.removeListener('data', fn);
        socket.emit('register');
      }
    });
  });

}

module.exports = mainPage;