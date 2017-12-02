var express = require("express");
var nunjucks = require('nunjucks');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var login = require("./login");
var regist = require('./regist');
var app = express();

nunjucks.configure('html', {
  autoescape: true,
  express: app
});

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/login', function (req, res) {
  res.render('login.html');
});

app.get('/regist', function (req, res) {
  res.render('regist.html');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/login', login);
app.post('/regist', regist);

app.listen(8080);