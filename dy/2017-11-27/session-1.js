/**
 * based on cookie
 */
const http = require('http');
const uuid = require('uuid/v4');    // v4是随机生成uuid
var debug = require('debug')('log');
var session = {};

http.createServer(function (req, res) {
  debug('log' + req.headers);
  var user;
  var sid;
  var cookie = req.headers['cookies'];
  if (cookie) {
    debug('log' + '*get cookie*');
    var cookies = cookie.split('; ');
    var index = cookies.indexOf('sid');
        
    if (index !== -1) {
      sid = cookies[index].split('=')[1];
      if (!sid) {
        debug('log' + sid);
        user = session[sid];
      }
    } 
  }
  if (!user) {
    debug('log' + '*no cookie*');
    //login , users' msg
    user = {
      id: uuid(),
      username: 'USER: ' + new Date().getTime(),
      password: 'PASSWORD: '
    };
    // // ssid
    sid = uuid();
    debug('log' + sid);
    session[sid] = user;
    res.writeHead(200, {
      'Set-Cookie': 'sid=' + sid,
      'Content-Type': 'text/html'
    });
    res.write('Hello! Your name is ' + user.username);
    res.end();
  }

}).listen(8080);