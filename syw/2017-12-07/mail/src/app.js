var express = require('express');
var users = require('./routes/users');
var mails = require('./routes/mails');
var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/users', users);
app.use('/mails', mails);

module.exports = app;

