var url = require('url');
var http = require('http');
var uuid = require('uuid/v4');
var qs = require('querystring');

var session = {};

http.createServer(function (req, res) {
    //恢复
    if (req.url !== '/favicon.ico') {

        var user;
        var sid;
        var parseUrl = url.parse(req.url);
        var qsUrl = qs.parse(parseUrl.query);
        console.log(qsUrl);
        if (qsUrl.sid) {
            user = session[qsUrl.sid];
        }

        //生成用户
        if (!user) {
            //登录，产生用户信息
            var user = {
                id: uuid(),
                usecName: 'user-' + new Date().getSeconds(),
                passWord: 'password'
            }

            console.log(user);
            //生成SID
            var sid = uuid();
            //保存用户信息
            session[sid] = user;
            var redirectUrl = "?sid=" + sid;
            res.writeHead(301, {
                'Location': redirectUrl
            });
        };
        res.write('your name is' + user.userName);
        res.write('Hello World');
        res.end();
    }

}).listen(8080);
