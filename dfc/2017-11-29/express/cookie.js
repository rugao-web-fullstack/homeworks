var express = require('express');
var debug = require('debug')('xxx');
var cookieParser = require('cookie-parser');
var app = new express();
app.use(cookieParser());
app.get('/', function(req, res) {
  res.cookie('name', '23333').send('YOU SUCCESS!');
  debug('log:' + res.cookie);
});
app.listen(3000);