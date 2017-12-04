var debug = require('debug')('gq');
var express = require('express');
var app = express();
// nunjucks.configure('templates', {
//   autoescape: true,
//   express: app
// });
app.get('/', function (req, res) {
	res.render('index.html', { name: 'Erin is 孙丑丑老大～' });
	res.render = function (filename, options,fs) {
		// 读取文件模板
		fs.readFile('templates/main.html', function (err, data) {
			if (err) {
				debug(err);
				return;
			}
			var content = String(data);
			var test = /{{(.*)}}/.test(content);
			debug(test);
			if (test) {
				debug(RegExp.$1);
				var key = RegExp.$1;
				if (key && options[key]) {
					content = content.replace('{{' + key + '}}', options[key]);

				}
			}
			res.write(content);
			res.end();
		});
	};
	//next();
});
app.listen(8080);