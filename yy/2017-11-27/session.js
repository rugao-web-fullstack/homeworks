var http = require("http");
var uuid = require("uuid/v4");
var session = {};
var debug = require("debug")("xxx");
http.createServer(function (req, res) {
	var cookie = req.headers["cookie"];
	var user;
	var index = -1;
	var sid;
	// 恢复
	if (cookie) {
		var cookies = cookie.split("; ");
		debug("log:" + cookie);
		debug("log:" + cookies);
		if (cookies) {
			for (var i = 0; i < cookies.length; i++) {
				if (cookies[i].indexOf("sid") === 0) {
					sid = cookies[i].split("=")[1];
					debug("log:" + sid);
					index = i;
					break;
				}
			}
			if (index !== -1) {
				user = session[sid];
			}
		}
	}

	// 生成
	if (!user) {
		user = {
			id: uuid(),
			username: "user-" + new Date().getTime(),
			password: "password"
		};
		// 生成SID
		sid = uuid();
		// 保存用户信息
		session[sid] = user;
		res.writeHead(200, {
			"Set-Cookie": "sid=" + sid,
			"Content-Type": "text/plain"
		});
	}
	res.write("your name is " + user.username);
	res.write("Hello World!");
	res.end();
}).listen(8080);