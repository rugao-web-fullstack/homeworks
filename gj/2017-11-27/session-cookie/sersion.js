//模拟自动登录
var debug = require('debug')('log');
var http = require('http');
var uuid = require('uuid/v4');
//uuid/v4随机生成一串特别长的ID，含有字母
var session = {};

var server = http.createServer(function (req, res) {
  if (req.url !== './favicon.ico') {
    var cookie = req.headers.cookie;
    var index = -1;
    var user;
    var sid;
    if (cookie) {
      // console.log(cookie);
      debug('log : ' + cookie);
      var cookies = cookie.split(';');
      // console.log(cookies);
      debug('log : ' + cookies);
      for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('sid') !== -1) {
          sid = cookies[i].split('='[1]);
          index = i;
          break;
        }
      }
      if (index !== -1) {
        user = session[sid];
      }
    }
    if (!user) {
      //新建一个user
      user = {
        userName: 'bbb',
        passWord: '123',
        id: uuid()
      };
      sid = uuid();
      session[sid] = user;
      //设置cookie
      res.writeHead(200, {
        'Set-cookie': 'sid=' + sid,
        'Content-Type': 'text/plain'
      });
    }
    res.write('Welconme user:' + user.userName);
    res.end();

  }

  
}).listen(8080, '127.0.0.1');

debug('log : ' + server);