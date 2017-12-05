var http = require('http');
var uuid = require('uuid/v4');
var url = require('url');
var qs = require('querystring');
var session = {};

http.createServer(function(req, res) {
  var user;
  var parsedUrl = url.parse(req.url);
  var query = qs.parse(parsedUrl.query);
  if (query.sid) {
    user = session[query.sid];
  }

  if (!user) {
    var user1 = {
      id: uuid(),
      username: 'user-' + new Date().getTime(),
      password: 'password'
    };
    var sid1 = uuid();
    session[sid1] = user1;
    var redirectUrl = '/?sid=' + sid1;
    res.writeHead(301, {
      'Location': redirectUrl
    });
  }
  res.end();
}).listen(8080);
