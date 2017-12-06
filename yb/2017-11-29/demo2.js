var express = require('express');
var app = express();
var debug = require('debug')('xxx');

app.use(function (req, res, next) {
  debug('log:' + 'inside middle ware');
  req.info = 'mid';
  next();
});

app.get('/', function (req, res) {
  res.write(req.info + '\n');
  res.send('hello world\n');
});

app.listen(3000);