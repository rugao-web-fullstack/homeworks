var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.get('/', function(req, res){
  res.cookie('name', 'express').send('Set Cookie'); //Sets name = express
});
app.listen(3000);
