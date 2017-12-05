var debug = require('debug')('xxx');
var http = require('http');
var url = require('url');
var uuid = require('uuid/v4');
var qs = require('querystring');
var session = {};
http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {//防止二次访问 
    var user;
    let params = qs.parse(url.parse(req.url).query);
    if (!user) {
      //如果不存在的话
      debug('log' + 'have none');
      user = {
        id: uuid(),
        username: 'user-' + new Date().getTime(),
        password: 'password'
      };
      var sid = uuid();
      session[sid] = user;
      debug('log' + session[sid].id);
      res.writeHead(301, {
        'Location': 'http://127.0.0.1:8080/?sid=' + sid,
        'Content-Type': 'text/plains'
      });
    }
    if (params.sid) {
      debug('log' + 'already have');
      user = session[params.sid];
      debug('log' + user.id);
    }
    res.write('your name is ' + user.username);
    res.end();
  }
}).listen(8080);
