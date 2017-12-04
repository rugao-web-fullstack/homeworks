/**
 * based on url querystring
 */
const http = require('http');
var url = require('url');
var debug = require('debug')('log');
var qs = require('querystring');
const uuid = require('uuid/v4');
var session = {};

http.createServer(function (req, res) {
  var user, params;
  debug('log' + '*req.headers* -> ' + req.headers);
  var urlStr = url.parse(req.url);
  debug('log' + '*urlStr.query* -> ' + urlStr.query);
  params = qs.parse(urlStr.query);
  debug('log' + params);
  if (params.sid) {
    debug('log' + '*have sid*');
    user = session[params.sid];
  } 
  if (!user) {
    //login , users' msg
    user = {
      id: uuid(),
      username: 'USER: ' + new Date().getTime(),
      password: 'PASSWORD: '
    };
    // ssid
    var sid = uuid();
    session[sid] = user;
    debug('log' + session[sid].id);
    var redirectUrl = '?sid=' + sid;
    res.writeHead(302, {
      'Location': redirectUrl,
      'Content-Type': 'text/plain'
    });
    res.write('Hello! Your name is ' + user.username);
    res.end();
  }

}).listen(8080);