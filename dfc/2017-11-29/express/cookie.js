var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = new express();
app.use(cookieParser());
app.get('/', function(req, res) {
	res.cookie('name', '23333').send('YOU SUCCESS!');
	console.log(res.cookie);
});
app.listen(3000);