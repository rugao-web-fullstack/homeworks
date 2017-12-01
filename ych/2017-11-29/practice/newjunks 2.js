var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
nunjucks.configure('templates', {
  autoescape: true,
  express: app
});
app.get('/', function (req, res) {
  res.render('main.html', { username: "Greate",password: "123" });
});
app.listen(8080);
