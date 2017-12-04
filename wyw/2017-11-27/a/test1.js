var http = require('http');
var uuid = require('uuid/v4');
var session = {};
var debug = require('debug')('test1');

http.createServer(function (req, res) {
  var cookie = req.headers['cookie'];
  var user;
  var index = -1;
  var sid;
  if (cookie) {
    var cookies = cookie.split(';');
    debug('log'+cookie);
    debug('log'+cookies);
    if (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('sid') === 0) {
          sid = cookies[i].split('=')[1];
          debug('log'+sid);
          index = i;
          break;
        }
      }
      debug('log'+'index=' + index);
      if (index !== -1) {
        user = session[sid];
      }
    }
  }
  if(!user){
    var user1 = {
      id:uuid(),
      username:'user-' + new Date().getTime(),
      password:'password'
    };
    var sid1 = uuid();
    session[sid1] = user1;
    res.writeHead(200,{
      'Set-Cookie':'sid=' + sid1,
      'Content-Type': 'text/plain'
    });
  }
  res.write('your name is' + user.username);
  res.write('Hello world');
  res.end();
}).listen(8080);
