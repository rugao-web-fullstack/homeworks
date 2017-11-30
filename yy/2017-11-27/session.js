var http = require('http');
var uuid = require('uuid/v4');
var session = {};

http.createServer(function (req, res) {
	var cookie = req.headers['cookie'];
	var user;
	var index = -1;
	var sid;
	// 恢复
	if (cookie) {
		var cookies = cookie.split("; ");
		console.log(cookie);
		console.log(cookies);
		if (cookies) {
			for (var i = 0; i < cookies.length; i++) {
				if (cookies[i].indexOf("sid") === 0) {
					sid = cookies[i].split("=")[1];
					console.log(sid);
					index = i;
					break;
				}
			}
			console.log('index =' + index);
			if (index !== -1) {
				user = session[sid];
				console.log(user);
			}
		}
	}

	// 生成
	if (!user) {
		// 登录,产生用户信息
	     user = {
			id: uuid(),
			username: "user-" + new Date().getTime(),
			password: 'password'
		};
		console.log('user.id->'+user.id);
		// 生成SID
		sid = uuid();
		console.log('sid-->'+sid);
		// 保存用户信息
		session[sid] = user;
		console.log('session-->'+session);
		res.writeHead(200, {
			'Set-Cookie': 'sid=' + sid,
			'Content-Type': 'text/plain'
		});
	}
	res.write("your name is " + user.username);
	res.write('Hello World!');
	res.end();
}).listen(8080);