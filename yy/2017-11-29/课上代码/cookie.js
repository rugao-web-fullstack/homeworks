var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/', function(req, res){
  res.cookie('name', 'express').send('cookie set'); //Sets name = express
});
app.listen(3000);