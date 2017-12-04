var express = require('express');
var debug = require('debug')('pug');
var pug = require('pug');
var app = express();
app.set('views', './templates');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  debug(pug);
  res.render('index', { name: 'Eric' });
});
app.listen(3000);