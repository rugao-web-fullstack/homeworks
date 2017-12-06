var express = require('express');
var app = express();
var main = require('../routes/main');
const path = require('path');

//---修改路径
app.set('views',path.join(__dirname,'../views'));
//---设置模板
app.set('view engine', 'jade');


app.use('/', main);
app.use('/register', main);
app.use('/login', main);
app.use('/welcome',main);
app.use('/writeMail',main);
app.use('/checkMail',main);
app.use('/checkMail_all',main);


app.listen(3002);