var http = require('http');
var uuid = require('uuid/v4');
const url = require('url');

var session = {};
var user = {};
http.createServer(function (req, res) {
    if (url.parse(req.url).path == '/favicon.ico') {
        return;
    }
    var sid;
    var id = uuid();
    sid = '?sid=' + id;
    if (req.url.length < 5) {
        session['sid'] = sid;
        user['id'] = id;
        res.writeHead(302, {Location: session['sid']});
    } else {
        var urlstring = url.parse(req.url).query.split('=')[1];
        if (user['id'] === urlstring) {
            res.write('Welcome!' + urlstring);
        }
        // console.log(urlstring);
    }
    res.end();
}).listen(8080);