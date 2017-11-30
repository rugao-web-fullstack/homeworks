var fs = require('fs');
var express = require('express');
var multer = require('multer')
var nunjucks = require('nunjucks');

var app = express();
var upload = multer({ dest: 'upload/' });

nunjucks.configure('templates', {
	autoescape: true,
	express: app
});

// µ¥Í¼ÉÏ´«
app.post('/', upload.single('logo'), function (req, res) {
	res.render("file.html");
});

app.get('/', function (req, res) {
	res.render("file.html");
});

app.listen(3000);