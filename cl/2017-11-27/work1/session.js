var http = require('http');
var uuid = require('uuid/v4');
var url = require("url");
var qs = require("querystring");
var session = {};

http.createServer(function (req, res) {
	console.log(req.headers);
	var cookie = req.headers['cookie'];
	var user;
	var index;
	var sid;
	if (cookie) {
		console.log(cookie);
		console.log(cookies);
		var cookies = cookie.split("; ");
		if (cookies) {
			for (var i = 0; i < cookies.length; i++) {
				if (cookies[i].indexOf("sid") !== -1) {
					sid = cookies[i].split("=")[1];
					console.log(sid);
					index = i;
					break;
				}
			}
			console.log('index = ' + index);
			if (index !== -1) {
				user = session[sid];
			}
		}
	}

	if (!user) {
		var user = {
			id: uuid(),
			username: "user" + new Date().getTime(),
			password: "password"
		}
		var sid = uuid();
		session[sid] = user;
		res.writeHead(200, { 'Set-Cookie': 'sid' + sid, 'Content-Type': 'text/plain' });
	}
	res.write('Your name is ' + user.username);
	res.write('Hello World!\n');
	res.end();
}).listen(8080);