var http = require("http");
var url = require('url');
var uuid = require("uuid/v4");
var qs = require('querystring');
var session = {};
http.createServer(function (req, res) {
    if (req.url !== '/favicon.ico') {
        var user;
        let params = qs.parse(url.parse(req.url).query);
        if (params.sid) {
            console.log("already have");
            user = session[params.sid];
            console.log(user.id);
        }
        if (!user) {
            console.log("have none");
            user = {
                id: uuid(),
                username: "user-" + new Date().getTime(),
                password: "password"
            };
            var sid = uuid();
            session[sid] = user;
            console.log(session[sid].id);
            redirectUrl = '?sid=' + sid;
            res.writeHead(301, {
                "Location": redirectUrl,
                "Content-Type": "text/plains"
            });
        }
        res.write("your name is " + user.username);
        res.end();
    }
}).listen(8080);
