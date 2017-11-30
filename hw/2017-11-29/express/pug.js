var express = require('express')
var pug = require('pug')
var app = express()
app.set('views', './templates');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    res.render('index', { name: "HW"})
  })
app.listen(3000)
