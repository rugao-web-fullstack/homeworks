var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('hello world\n');
}).listen(3000);