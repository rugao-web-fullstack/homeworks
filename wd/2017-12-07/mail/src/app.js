var express = require('express');
var users = require('./routes/users');
var emails = require('./routes/emails');
// var api = require('./routes/api');

var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/users', users);
app.use('/emails', emails);
// app.listen(3000);
module.exports = app;

