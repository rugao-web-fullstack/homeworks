var express = require('express')
var psth = require('path')
var app = express()

app.use(express.static('public'));

// app.use('/static', express.static('public'));

app.listen(3000)
