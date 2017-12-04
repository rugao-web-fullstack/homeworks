var http = require('http');
var url = require('url');
var debug = require('debug')('xxx');
var uuid = require('uuid/v4');
var qs = require('querystring');
var session = {};
http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var user;
    let params = qs.parse(url.parse(req.url).query);
    if (params.sid) {
      debug('log' + 'already have');
      user = session[params.sid];
      debug('log' + user.id);
    }
    if (!user) {
      debug('log' + 'have none');
      user = {
        id: uuid(),
        username: 'user-' + new Date().getTime(),
        password: 'password'
      };
      var sid = uuid();
      session[sid] = user;
      debug('log' + session[sid].id);
      var redirectUrl = '?sid=' + sid;
      res.writeHead(301, {
        'Location': redirectUrl,
        'Content-Type': 'text/plains'
      });
    }
    res.write('your name is ' + user.username);
    res.end();
  }
}).listen(8080);
