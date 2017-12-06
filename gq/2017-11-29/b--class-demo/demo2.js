var express = require('express');
// var path = require('path')
var app = express();

//var filepath = path.resolve(__dirname,'./public')
app.use(express.static('public'));
app.listen(3000);
