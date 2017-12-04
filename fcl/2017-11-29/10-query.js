var express = require('express');
var app = express();
var debug = require('debug')('log');
app.use('/', function(req, res) {
  debug('log:' + req.query);
  res.end();
});
app.listen(3000);
