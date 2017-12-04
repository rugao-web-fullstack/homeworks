var debug = require('debug')('xxx');
var http = require('http');
var uuid = require('uuid/v4');
var qs = require('querystring');
var url = require('url');
var session = {};
http.createServer(function(req, res) {
    var sid;
    //恢复
    var parsedUrl = url.parse(req.url);
    var query = qs.parse(parsedUrl.query);
    debug(query);
    if (query.sid) {
        user = session[query.sid];
        debug('has this sid ' + user);
    }
    debug(user + '---------------------');
    if (!user) {
        //登录产生用户信息
        var user = {
            id: uuid(),
            username: 'user ' + new Date().getTime(),
            password: 'password'
        };
        debug(user);
        var ssid = uuid(); //生成用户ID
        var redirectUrl = url;
        //保存用户信息
        session[ssid] = user;
        redirectUrl = 'http://127.0.0.1:8080/?sid=' + sid;
        res.writeHead(301, {
            Location: redirectUrl
        });
    }

    res.write('your name is : ' + user.username);
    res.end();
}).listen(8080);
