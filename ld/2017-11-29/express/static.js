//var path = require("path")
var express = require('express')
var app = express()

//var filepath = path.resolve(__dirname, "./111/index.html");
app.use(express.static('111'));

app.listen(3000)
