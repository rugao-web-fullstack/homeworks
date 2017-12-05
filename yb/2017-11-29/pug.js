var express = require('express');
//var pug = require('pug');
//var path = require('path');
var app = express();

app.set('views', './templates');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index', { name: 'dick'});
});
app.listen(3000);