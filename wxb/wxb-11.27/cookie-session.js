var http = require("http");
var uuid = require("uuid/v4");
const url = require("url");

var session = {};
http.createServer(function (req, res) {
    if (url.parse(req.url).path == '/favicon.ico') {
        return;
    }
    var sid = uuid();
    var cookie = req.headers.cookie;
    if (!cookie) {
        res.writeHead(200, {
            "Set-Cookie": "sid=" + sid,
            "Content-Type": "text/plain; charset=utf8"
        });
        res.write("尚未注册");
    } else {
        cookie.split(";").forEach(function (cookie) {
            var parts = cookie.split("=");
            if (parts[0].trim() === 'sid') {
                session[parts[0].trim()] = (parts[1] || "").trim();
                res.write("Welcome! Userid: " + session["sid"]);
            }
        })
    }
    res.end();
}).listen(8080);