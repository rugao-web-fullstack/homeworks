var express = require('express');
var session = require('express-session');
var index = require('./routes/index');
var app = express();

app.use(session({secret: 'sosososososso'}));
app.use('/', index);
exports.app = app;