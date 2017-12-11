var express = require('express');
var users = require('./routes/users');
var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/users', users);
module.exports = app;

