var express = require('express');
var path = require('path');
var app = express();

var debug = require('debug')('log');
debug('log' + path);

app.use(express.static('public'));

// app.use('/static', express.static('public'));

app.listen(3000);
