var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../config/db');
var session = require('express-session');
var debug = require('debug')('main');

/* 用户名和密码 */
var username = [];
var password = [];

/* 设置session密钥 */
router.use(session({
  secret: 'sinpo',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

router.use(bodyParser.urlencoded({extended: true}));

router.use(express.static(path.join(__dirname, '../public')));
/* GET home page. */
router.get('/', function (req, res) {
  res.render('main');
});

/* 注册 */
router.get('/register', function (req, res) {
  res.render('register');
});

/* 登录 */
router.get('/login', function (req, res) {
  res.render('login');
});

/* 欢迎页 */
router.get('/welcome', function (req, res) {
  res.render('welcome', {
    name: req.session.user
  });
});

/* 编写邮件 */
router.get('/writeMail', function (req, res) {
  res.render('writeMail');
});

/* POST获取发送邮件的数据并存入数据库 */
router.post('/writeMail', function (req, res) {
  db.query('INSERT INTO `mail`.`mail` (`sender`, `receiver`, `title`, `content`) VALUES (\'' + req.session.user + '\', \'' + req.body.receiver + '\', \'' + req.body.title + '\', \'' + req.body.content + '\');', function (err) {
    if (err) {
      debug('Failed' + err);
    } else {
      debug('Success insert mail');
    }
  });
  res.redirect('/welcome');
});

/* 查看邮件 */
router.get('/checkMail_all', function (req, res) {
  db.query('select * from mail where receiver=\'' + req.session.user + '\'', function (err, rows) {
    if (err) {
      debug('Failed' + err);
    } else {
      var mailArr = [];
      var shortMail = [];
      for (var i = 0; i < rows.length; i++) {
        var sender = rows[i].sender;
        var receiver = rows[i].receiver;
        var title = rows[i].title;
        var content = rows[i].content;
        var mailstring = 'id: ' + i + ' sender: ' + sender + ' receiver: ' + receiver + ' title: ' + title + ' content: ' + content;
        mailArr.push(mailstring);
        var shortString = 'id: ' + i + ' sender: ' + sender + ' title: ' + title;
        shortMail.push(shortString);
      }
      res.render('checkMail_all', {
        short:shortMail,
        mailArr: mailArr
      });
    }
  });

});

/* 添加进数据库 */
router.post('/register-add', function (req) {
  // debug(req.body.email+req.body.pwd);//---1223157723@qq.com123
  var mail_address = req.body.email;
  var password = req.body.pwd;
  db.query('INSERT INTO `mail`.`user` (`username`, `password`) VALUES (\'' + mail_address + '\', \'' + password + '\');', function (err) {
    if (err) {
      debug('Failed' + err);
    } else {
      debug('Success insert');
    }
  });
});

/* 登录验证 */
router.post('/login-confirm', function (req, res) {
  var login_email = req.body.mail;
  var login_password = req.body.pwd;
  db.query('select * from user', function (err, rows) {
    if (err) {
      debug('err: ' + err);
    } else {
      /* 保存用户名 */
      /* 保存密码 */
      for (var i = 0; i < rows.length; i++) {
        username.push(rows[i].username);
        password.push(rows[i].password);
      }
      if (username.indexOf(login_email) !== -1 && password.indexOf(login_password) !== -1) {
        debug('验证成功');
        req.session.user = login_email;
        //     ---ajax局部刷新
        res.redirect();
      }
    }
  });
});

module.exports = router;
