var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

nunjucks.configure('templates',{
  autoescape:true,
  express:app
});

app.get('/',function(req,res){
  res.render('nunjuck.html',{name:'hi!!!!'});
});