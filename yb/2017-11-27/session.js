var http = require('http');
var uuid = require('uuid/v4');
var qs = require('qs');
var url = require('url');
var session = {};

http.createServer(function(req, res) {
	var user;
	var sid;
	var parsedUrl = url.parse(req.url);
	var query = qs.parse(parsedUrl.query);
	if(query.sid) {
		user = session[query.sid];
		console.log(user);
	}

	if(!user) {
		var user = {
			id: uuid(),
			username: "user-" + new Date().getTime(),
			password: 'password'
		};
		console.log(user);
		//生成sid
		var sid = uuid();
		//保存用户信息
		session[sid] = user;
		redirectUrl = "?sid=" + sid;
		res.writeHead(301, {
			Location: redirectUrl
		});
	}
	res.write("Your name is" + user.username + "\n");
	res.write("Hello World!");
	res.end();
}).listen(8080);