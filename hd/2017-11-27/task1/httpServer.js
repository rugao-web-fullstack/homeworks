var http = require('http');
var Session = require('./Session.js');
var debug = require('debug');

http.createServer(function (req, res) {

  var session = new Session(req, res);
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8'
  });
  if (session.getSession('user')) {
    res.write('登陆成功！ 你的用户名为：' + session.getSession('user').username);
    res.write('\nHello World!');
  } else {
    session.setSession('user', {
      'username': 'user-' + new Date().getTime(),
      'password': 'password'
    });
    res.write('账号注册成功！ 用户名为：' + session.getSession('user').username);
  }
  res.end();
}).listen(8080, function () {
  debug('服务器正在监听8080端口');
});