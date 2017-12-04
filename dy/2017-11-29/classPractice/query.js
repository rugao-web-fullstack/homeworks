var express = require('express');
var app = express();
var debug = require('debug')('log');

app.use('/', function (req) {
  debug('log' + req.query);
});
app.listen(3000);