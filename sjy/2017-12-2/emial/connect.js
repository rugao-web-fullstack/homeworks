var express = require('express');
var register = require('./register');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var login = require('./login');
var write = require('./write');
var read = require('./read');
var app = express();

nunjucks.configure('html', {
  autoescape: true,
  express: app
});
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/login', login);
app.post('/register', register);
app.post('/main',write);
// app.get('/read', function (req, res) {
// 	res.render("read.html");
// });
app.get('/read',read);
// app.get('/read', function (req, res) {
// 	res.render("read.html");
// });
app.get('/write', function (req, res) {
  res.render('write.html');
});
app.get('/register', function (req, res) {
  res.render('register.html');
});
app.get('/', function (req, res) {
  res.render('login.html');
}); 
app.get('/main', function (req, res) {
  res.render('main.html');
}); 
app.get('/login', function (req, res) {
  res.render('login.html');
}); 
app.listen(3000);
