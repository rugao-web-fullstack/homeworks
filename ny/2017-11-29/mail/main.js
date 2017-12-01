var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser  = require("body-parser"); 
var cookieParser = require('cookie-parser');
var login = require("./login");
var register = require("./register");
var mailbox = require("./mailbox");
var app = express();

nunjucks.configure('html', {
	autoescape: true,
	express: app
});
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());
app.post('/login', login);
app.post('/register', register);
app.post('/mailbox', mailbox);

app.get('/', function (req, res) {
	res.render("index.html");
});
app.get('/register', function (req, res) {
	res.render("register.html");
});
app.get('/mail', function (req, res) {
	res.render("mail.html");
});
app.get('/readMail', function (req, res) {
	res.render("readMail.html");
});
app.get('/writeMail', function (req, res) {
	res.render("writeMail.html");
});
app.get('/mailboxAdd', function (req, res) {
	res.render("mailboxAdd.html");
});
app.listen(3000);
