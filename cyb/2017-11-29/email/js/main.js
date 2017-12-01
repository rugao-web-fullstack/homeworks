var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var login = require('./login');
var register = require('./register');
var app = express();

nunjucks.configure('html', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/login', login);
app.post('/register', register);

app.get('/', function (req, res) {
    res.render("index.html");
});
app.get('/register', function (req, res) {
    res.render("register.html");
});

app.listen(3000);
