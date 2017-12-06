var http = require(http);
var uuid = require(uuid);
var session = {};
var debug = require('debug')('xxx');
http.createServer(function (req, res) {
  var cookie = req.headers[cookie];
 
  var index = -1;
  

  if (cookie) {
    var cookies = cookie.split(';');
    debug('log' + cookie);
    debug('log' + cookies);
    if (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('sid') === 0) {
          sid = cookies[i].split('='[1]);
          debug('log' + sid);
          
          index = i;
          break;
        }
      }
      debug('log' + 'index =' + index);
      
      if (index !== -1) {
        user = session[sid];
      }
    }
  }
  if (!user) {
    var user = {
      id: uuid(),
      username: 'user-' + new Date().getTime(),
      password: 'password'
    };

    var sid = uuid();
    session[sid] = user;
    res.writeHead(200, {
      'Set-Cookie': 'sid' + sid,
      'Content-Type': 'text/plain'
    });
  }
  res.write('you name is ' + user.username);
  res.write('Hello Word!');
  res.end();
}).listen(8080);
