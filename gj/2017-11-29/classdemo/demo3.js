var debug = require('debug')('log');
var express = require('express');
var app = express();
app.use(function (req, res, next) {
  // console.log('inside middle ware');
  debug('log : ' + 'inside middle ware');
  req.info = req.info1 + ' top';
  next();
});
app.use(function (req, res, next) {
  // console.log('inside middle ware');
  debug('log : ' + 'inside middle ware');
  req.info1 = req.info + ' mid';
  next();
});
app.get('/', function (req, res) {
  res.write(req.info + '\n');
  res.write(req.info1 + '\n');
  res.end('Hello World\n');
});

app.listen(3000);
