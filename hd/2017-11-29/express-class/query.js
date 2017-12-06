var express = require('express');
var debug = require('debug');
var app = express();
app.use('/', function(req) {
  debug(req.query);
});
app.listen(3000);