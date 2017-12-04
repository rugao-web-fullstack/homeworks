var http = require('http');
var uuid = require('uuid/v4');
var url = require('url');
var qs = require('querystring');
var session = {};
var debug = require('debug')('session-url');

http.createServer(function (req, res) {
  // console.log(req.url);
  if (req.url !== '/favicon.ico') {

    var user;
    var sid;
    // 恢复
    var parseUrl = url.parse(req.url);
    var qsUrl = qs.parse(parseUrl.query);
    if (qsUrl.sid) {
      user = session[qsUrl.sid];
      debug(user);
      // console.log(user);
    }

    // 生成
    if (!user) {
      // console.log('进来了');
      // 登录,产生用户信息
      user = {
        id: uuid(),
        username: 'zed' + new Date().getSeconds(),
        password: 'passord'
      };

      // 生成SID
      sid = uuid();
      // 保存用户信息
      session[sid] = user;
      var redirectUrl = '?sid=' + sid;
      // console.log(sid);
      res.writeHead(301, {
        'Location': redirectUrl
      });
    }

    res.write('your name is ' + user.username);
    res.write('Hello World!');
    res.end();
  }
}).listen(8080);