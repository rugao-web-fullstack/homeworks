function Main(client) {
  client.on('main', function () {
    client.write('注 册 （‘zc’） \n登 录（‘dl’）\n');
    client.on('data', function fn(data) {
      if (data.toString().split('\r\n')[0] === 'zc') {//注册
        client.removeListener('data', fn);
        client.emit('register');
      } else if (data.toString().split('\r\n')[0] === 'dl') {//登录
        client.removeListener('data', fn);
        client.emit('login');

      } else {
        client.write('未 知 指 令 ！\n');
        client.removeListener('data', fn);
        client.emit('main');
      }
    });

  });
}
exports.Main = Main;
