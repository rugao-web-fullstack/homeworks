var debug = require('debug')('xxx');

var http = require('http');
var uuid = require('uuid/v4');
var url = require('url');
var qs = require('querystring');
var session = {};

debug('info'+url);
debug('info'+qs);
http.createServer(function (req, res) {
  debug('info'+req.headers);
  var cookie = req.headers['cookie'];
  var user;
  var index;
  var sid;
  if (cookie) {
    debug('info'+cookie);
    debug('info'+cookies);
    var cookies = cookie.split('; ');
    if (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('sid') !== -1) {
          sid = cookies[i].split('=')[1];
          debug('info'+sid);
          index = i;
          break;
        }
      }
      debug('info'+'index = ' + index);
      if (index !== -1) {
        user = session[sid];
      }
    }
  }

  if (!user) {
    user = {
      id: uuid(),
      username: 'user' + new Date().getTime(),
      password: 'password'
    };
    sid = uuid();
    session[sid] = user;
    res.writeHead(200, { 'Set-Cookie': 'sid' + sid, 'Content-Type': 'text/plain' });
  }
  res.write('Your name is ' + user.username);
  res.write('Hello World!\n');
  res.end();
}).listen(8080);