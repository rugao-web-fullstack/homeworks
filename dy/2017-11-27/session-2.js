/**
 * based on url querystring
 */
const http = require('http');
var url = require('url');
var qs = require('querystring');
const uuid = require('uuid/v4');
var session = {};

http.createServer(function (req, res) {
    var user, params;
    console.log('*req.headers* -> ' + req.headers);
    var urlStr = url.parse(req.url);
    console.log('*urlStr.query* -> ' + urlStr.query);
    params = qs.parse(urlStr.query);
    console.log(params);
    if (params.sid) {
        console.log('*have sid*');
        user = session[params.sid];
    } 
    if (!user) {
        //login , users' msg
        var user = {
            id: uuid(),
            username: "USER: " + new Date().getTime(),
            password: "PASSWORD: "
        }
        // ssid
        var sid = uuid();
        session[sid] = user;
        console.log(session[sid].id);
        redirectUrl = '?sid=' + sid;
        res.writeHead(302, {
            'Location': redirectUrl,
            'Content-Type': 'text/plain'
        });
        res.write('Hello! Your name is ' + user.username);
        res.end();
    }

}).listen(8080);