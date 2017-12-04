var debug = require('debug')('xxx');
var http = require('http');
var uuid = require('uuid/v4');
var session = {};

http.createServer(function(req, res) {
  var cookie = req.headers['cookie'];
  var user;
  var index = -1;
  var sid;
  // 恢复
  if(cookie) {
    var cookies = cookie.split(';');
    debug(cookie);
    debug(cookies);
    if(cookies) {
      for(var i = 0; i < cookies.length; i++) {
        if(cookies[i].indexOf('sid') === 0) {
          sid = cookies[i].split('=' [1]);
          debug(sid);
          index = i;
          break;
        }
      }
      debug('index =' + index);
      if(index !== -1) {
        user = session[sid];
      }
    }
  }
  if(!user) {
    var uuser = {
      id: uuid(),
      username: 'user-' + new Date().getTime(),
      password: 'password'
    };

    var ssid = uuid();
    session[ssid] = uuser;
    res.writeHead(200, {
      'Set-Cookie': 'sid' + sid,
      'Content-Type': 'text/plain'
    });
  }
  res.write('your name is ' + user.username);
  res.write('Hello Word!');
  res.end();
}).listen(8080);
