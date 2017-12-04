var debug = require('debug')('xxx');
var express = require('express');
var path = require('path');
var app = express();

var filepath = path.resolve(__dirname, './piblic');
debug('log:' + filepath);
app.use(express.static('public'));

app.use(express.static('public'));

app.listen(3000);
