var express = require('express');
var debug = require('debug')('xxx');
var app = express();

app.use(function(req, res, next) {
  debug('log:' + '2333333');
  req.info1 = '111';
  next();
});
app.use(function(req, res, next) {
  debug('log:' + '2333333');
  req.info2 = req.info1 + '222';
  next();
});
app.get('/', function(req, res) {
  res.write(req.info1);
  res.write(req.info2);
  res.end('Hello World\n');
});
app.get('/233', function(req, res) {
  res.end('Hello 233\n');
});
app.get('/users/:id', function(req, res) {
  debug('log:' + req.params);
  res.end('Hello users\n' + req.params.id);
});

app.listen(3000);