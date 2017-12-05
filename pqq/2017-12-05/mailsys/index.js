var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = require('./usersapi').usersapi;
var mails = require('./mailsapi').mailsapi;

var main = require('./user').main;
var user = require('./user').user;
var mail = require('./mail').mail;

app.use(bodyParser.urlencoded({ extended: false }));


// 网站的URL
app.use('/', main);   
app.use('/user', user); 
app.use('/mail', mail);

// 网站的API
app.use('/users', users);
app.use('/mails', mails);

app.listen(3000);
