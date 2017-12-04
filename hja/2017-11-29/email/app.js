var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var mails = require('./routes/mails');

//引用user模块
var UserList = require('./database/user').Users;
//引用mails模块
var MailList = require('./database/mails').Mails;
//引用session存储模块
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "sosos" }));



//判断是否有session.user
app.use('/index', function (req, res, next) {
  console.log('进入首页');
  //判断session是否存在
  if (req.session.user) {
    console.log('存在');
    //转入home路由
    res.redirect('/users/home');
    return;

    // res.redirect('/users/home');
  } else {
    console.log('不存在');
  }

  next();
});
app.use('/index', index);
app.use('/users', users);
app.use('/mails', mails);

//--获取注册数据
app.post('/users/register', function (req, res) {
  console.log(req.body);
  console.log('haha');

  // 解析数据
  let username = req.body.username;
  let password = req.body.password;

  UserList.addUser(username, password, function (err) {
    if (err) {
      res.send('0');
      return;
    } else {
      res.send('/users/login');
      return;
    }

  })

});


//注册时动态检验用户名
app.post('/users/uscheck', function (req, res) {

  //解析数据
  let username = req.body.username;
  UserList.recheck(username, function (err) {

    if (err) {
      res.send('0');
      return;
    }
    res.send('1');

    return;
  });



});

//--获取登录数据
app.post('/users/login', function (req, res) {
  console.log(req.body);
  //获取了登录信息,现在去查询
  let username = req.body.username;
  let password = req.body.password;
  UserList.login(username, password, function (err, flag) {
    if (err) {
      if (flag === 0) {
        res.send('0');
        return;
      }
      res.send('1');
      return;


    }
    //设置session
    req.session.user = req.body;
    res.send('/users/home');
    return;


  });
});


//动态监测是否存在接收者
app.post('/mails/recheck', function (req, res) {
  let receiver = req.body.receiver;
  //去User里检索是否存在该用户
  UserList.recheck(receiver, function (err) {

    if (err) {
      res.send('1');
      return;
    }
    res.send('0');

    return;
  });
});


//--获取编写数据
app.post('/mails/write', function (req, res) {
  console.log(req.body);
  //解析
  let sender = req.body.sender;
  let receiver = req.body.receiver;
  let title = req.body.title;
  let body = req.body.body;
  MailList.sendMail(sender, receiver, title, body, function (err) {
    if (err) {
      res.send('发送失败');
      return;
    }
    console.log('Mail发送成功');
    //--重定向到主页
    res.redirect('/users/home');
  });

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;