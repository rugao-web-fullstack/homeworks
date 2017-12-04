var http = require('http');
var uuid = require('uuid/v4');
var url = require('url');
var qs = require('querystring');
var session = {};

http.createServer(function (req, res) {
	var user;
	var parsedUrl = url.parse(req.url);
	var query = qs.parse(parsedUrl.query);
	if (query.sid) {
		user = session[query.sid];
	}
	if (!user) {
		user = {
			id: uuid(),
			username: 'user-' + new Date().getTime(),
			password: 'password'
		};
		//生成Sid
		var sid = uuid();
		//保存用户信息
		session[sid] = user;
		var redirectUrl = '?sid=' + sid;
		res.writeHead(301,
			{
				'Location': redirectUrl,
				'Content-Type': 'text/plains'
			});
	}
	res.write(user.username);
	res.end();
}).listen(8080);




