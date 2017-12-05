var debug = require('debug')('log');
var url = require('url');
var http = require('http');
var uuid = require('uuid/v4');
var qs = require('querystring');

var session = {};

http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var user;
    var sid;
    var parseUrl = url.parse(req.url);
    var qsUrl = qs.parse(parseUrl.query);
    if (qsUrl.sid) {
      user = session[qsUrl.sid];
    }

    //生成用户
    if (!user) {
      // console.log('TE');
      debug('log : ' + 'TE');
      //登录，产生用户信息
      user = {
        id: uuid(),
        usecName: 'user-' + new Date().getSeconds(),
        passWord: 'password'
      };
      // console.log(user);
      debug('log : ' + user);
      //生成SID
      sid = uuid();
      //保存用户信息
      session[sid] = user;
      var redirectUrl = '?sid=' + sid;
      res.writeHead(301, { 'Location': redirectUrl });
    }
    res.write('your name is' + user.userName);
    res.write('Hellow World');
    res.end();
  }

}).listen(8080, '127.0.0.1');