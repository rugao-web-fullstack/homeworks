var http = require('http');
var url = require('url');
var qs = require('querystring');
var uuid = require('uuid/v4');
var session = {};
http.createServer(function (req, res) {
  var user;
  var sid;
  // 恢复
  var query = qs.parse(url.parse(req.url).query);
  if(query.sid){
    user = session[query.sid];
  }

  // 生成
  if (!user) {
    // 登录,产生用户信息
    user = {
      id: uuid(),
      username: 'user-' + new Date().getTime(),
      password: 'passord'
    };
    // 生成SID
    sid = uuid();
    // 保存用户信息
    session[sid] = user;
    //redirectUrl = "http://127.0.0.1:8080/?sid=" + sid;
    //res.writeHead(301,{
    //Location:redirectUrl
    //});
  }
	
  res.write('your name is ' + user.username);
  res.end();
}).listen(8080);