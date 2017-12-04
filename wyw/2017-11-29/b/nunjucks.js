var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
nunjucks.configure('templates', {
	autoescape: true,
	express: app
});
app.get('/', function (req, res) {
	res.render('main.html', { name: 'Greate' });
});
app.listen(8080);