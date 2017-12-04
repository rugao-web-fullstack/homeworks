var http = require('http');
var Session = require('./SessionByUrl.js');
var debug = require('debug');

http.createServer(function (req, res) {

  if (req.url == '/favicon.ico') {
    return;
  }

  var session = new Session(req, res);

  if (session.getSession('user')) {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8'
    });
    res.write('登陆成功！ 你的用户名为：' + session.getSession('user').username);
    res.write('\nHello World!');
  } else {
    var sid = session.sid;
    res.writeHead(302, {
      'Content-Type': 'text/html;charset=utf-8',
      'Location': '?sid=' + sid
    });

    session.setSession('user', {
      'username': 'user-' + new Date().getTime(),
      'password': 'password'
    });
  }
  res.end();
}).listen(8080, function () {
  debug('服务器正在监听8080端口');
});