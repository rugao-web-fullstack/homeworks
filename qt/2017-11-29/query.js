var debug = require('debug')('log');
var express = require('express');
var app = express();
app.use('/', function(req) {
  debug('log:' + req.query);
});
app.listen(3000);