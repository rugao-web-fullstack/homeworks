var express = require('express');
var user = require('./routes/user');
var mail = require('./routes/mail');

var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/user', user);
app.use('/mail', mail);

// app.listen(3000);
module.exports = app;
