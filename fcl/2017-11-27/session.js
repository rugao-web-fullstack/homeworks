var http = require('http');
var uuid = require('uuid/v4');

var session = {};

http.createServer(function(req, res) {
  var cookie = req.headers['cookie'];
  var user;
  var index = -1;
  var sid;
  //恢复
  if (cookie) {
    var cookies = cookie.split('; ');
    if (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('sid') === 0) {
          sid = cookies[i].split('=')[1];
          index = -1;
          break;
        }
      }
      if (index !== -1) {
        user = session[sid];
      }
    }
  }
  //生成
  if (!user) {
    //登录，产生的用户信息
    var user1 = {
      id: uuid(),
      username: 'user-' + new Date().getTime(),
      password: 'password'
    };

    //生成sid
    var sid1 = uuid();
    //保存用户信息
    session[sid1] = user1;
    res.writeHead(200, {
      'Set-Cookie': 'sid=' + sid1,
      'Content-type': 'text/html;charSet=utf-8'
    });
    res.write('your name is ' + user1.username);
    res.write('Hello the World!');
    res.end();
  }
}).listen(8000);
