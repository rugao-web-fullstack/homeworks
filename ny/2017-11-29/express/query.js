var express = require('express');
var app = express();
var debug = require('debug')('query');
app.use('/', function(req) {
  debug('log' + req.query);
});
app.listen(3000);
