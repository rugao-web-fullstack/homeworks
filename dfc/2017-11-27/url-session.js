var http = require('http');
var uuid = require('uuid/v4');
var qs = require('querystring');
var debug = require('debug')('xxx');
var url = require('url');
var session = {};

http.createServer(function (req, res) {
  var user;
  var sid;

  var query = qs.parse(url.parse(req.url).query);
  if (query.sid) {
    user = session[query.sid];
  }
  debug('log:' + user);
  // 生成
  if (!user) {
    // 登录,产生用户信息
    user = {
      id: uuid(),
      username: 'user-' + new Date().getTime(),
      password: 'passord'
    };

    // 生成SID
    sid = uuid();
    // 保存用户信息
    session[sid] = user;
    var querystr = qs.stringify({
      'sid': sid
    });
    debug('log:' + session);
    res.writeHead(301, {
      Location: 'http://127.0.0.1:8080/?' + querystr
    });
  }
  res.write('your name is ' + user.username);
  res.write('Hello World!');
  res.end();
}).listen(8080);