var debug = require('debug')('xxx');
var express = require('express');
var pug = require('pug');
debug('log:' + pug);
var app = express();
app.set('views', './templates');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index', { name: 'HW' });
});
app.listen(3000);
