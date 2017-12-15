var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var app = express();
var base = require('./connectServer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var debug = require('debug')('index');
app.use(cookieParser('sessiontest'));
app.use(session({
  secret: 'sessiontest',
  resave: true,
  saveUninitialized:true
}));
nunjucks.configure('public', {
  autoescape: true,
  express: app
});
app.get('/',function(req,res){
  res.render('homepage.html');
});
app.get('/user/register',function(req,res){
  res.render('register.html');
});
app.get('/user/login',function(req,res){
  res.render('login.html');
});
app.get('/mail/write',function(req,res){
  res.render('writeemail.html');
});
app.get('/mail/read',function(req,res){
  res.render('reademail.html');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/home',function(req,res){
  var username = req.body.username;
  base(function(con){
    var sql = 'select * from user where username = \''+username+'\';';
    con.query(sql, function (err,result){
      if(err) throw err;
      if(result == ''){
        debug('log:username is not existed!');			
      }else{
        req.session.username = username;
        res.render('emailpage.html');
      }
    });
  },'emaildb');
});
app.post('/user/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  base(function(con){
    var sql = 'select * from user where username = \''+username+'\';';
    con.query(sql, function (err,result){
      if(err) throw err;
      if(result == ''){
        base(function(con){
          var sql1 = 'insert into user(username,password) values(\''+username+'\',\''+password+'\');';
          con.query(sql1, function (err1){
            if(err1) throw err;
            debug(username+' inserted successfully');
          });
        },'emaildb');
        res.render('login.html');
      }else{
        debug('data is existed');	
        res.render('register.html');
      }
    });
  },'emaildb');
});
app.post('/mail/write',function(req,res){
  var title = req.body.title;
  var content = req.body.content.replace(/[\\\b\f\n\r\t]/g, ''); 
  var receiver = req.body.receiveraddr;
  var sender = req.session.username;
  base(function(con){
    var sql = 'select * from user where username = \''+receiver+'\';';
    con.query(sql, function (err,result){
      if(err) throw err;
      if(result==''){
        debug('receiver is not existed');
        return;
      }
    });
  },'emaildb');
  
  base(function(con){
    var sql = 'insert into email(sender,receiver,title,content) values(\''+sender+'\',\''+receiver+'\',\''+title+'\',\''+content+'\')';
    con.query(sql, function (err){
      if(err) throw err;
      return;
    });
  },'emaildb');
  res.render('sendsucc.html');
});
//app.listen(8080);
exports.app = app;
