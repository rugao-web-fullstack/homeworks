var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

nunjucks.configure('html', {
	autoescape: true,
	express: app
});
app.post('/', function (req, res) {
	res.render('index.html');
});

app.get('/', function (req, res) {
	res.render('index.html');
});
app.get('/register', function (req, res) {
	res.render('register.html');
});
app.listen(3000);
