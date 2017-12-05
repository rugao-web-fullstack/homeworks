var debug = require('debug')('log');
var express = require('express');
var pug = require('pug');
var app = express();
debug('log : ' +pug );

app.set('views', './templates');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index', { name: 'Eric' });
});
app.listen(3000);