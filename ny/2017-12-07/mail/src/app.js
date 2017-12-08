var express = require('express');
var path = require('path');
var index = require('./routes/index');
var users = require('./routes/users');
var mails = require('./routes/mails');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
app.use('/users', users);
app.use('/mails', mails);
// app.listen(3000);
exports.app = app;
