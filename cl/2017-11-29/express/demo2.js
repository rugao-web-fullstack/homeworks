var debug = require('debug')('xxx');
var express = require('express');
var app = express();
app.use(function (req, res, next) {
  debug('info'+'inside middle ware');
  req.info = 'mid';
  next();
});
app.get('/', function (req, res) {
  res.write(req.info + '\n');
  res.end('Hello World\n');
});

app.listen(3000);