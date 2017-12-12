var express = require('express');
var router = express.Router();

//引用session模块
var session = require('express-session');
router.get(session({ secret: 'sosos' }));

// 引用用户管理模块
var userMannage = require('../operation/usermannage');
//引用邮件管理模块
var mailMannage = require('../operation/mailmannage');

var cbRouters = require('../operation/cb').cbRouters;

//用户登录
var userLogin = function (req, res) {
  userMannage.Login(req.body.username, req.body.password, cbRouters(function () {
    // console.log(req.session);
    req.session.user = req.body;
    res.json('/users/home');
    return;
  }, res));
};

//注册部分
var userRegister = function (req, res) {
  userMannage.Register(req.body.username, req.body.password, req.body.mailbox,
    cbRouters(function () {
      res.json('/users/login');
      return;
    }, res));
};

//注册用户名查重，邮件查看是否有此收件人
router.get('/users/:name', function (req, res) {
  userMannage.CheckUser(req.params.name, cbRouters(function () {
    res.json('1');
    return;
  }, res));
});

//用户action
router.post('/users', function (req, res) {
  switch (req.body.action) {
  case 'login':
    userLogin(req, res);
    break;
  case 'register':
    userRegister(req, res);
    break;
  }
});

//发送邮件
var mailSend = function (req, res) {
  mailMannage.Send(req.body.sender, req.body.receiver, req.body.title, req.body.content, req.body.iread, cbRouters(function () {
    res.json('/users/home');
    return;
  }, res));
};

//读邮件
router.get('/read/:name', function (req, res) {
  mailMannage.Read(req.params.name, cbRouters(function (maillist) {
    res.json(maillist);
    return;
  }, res));
});

//读取邮件详情
router.get('/readcontent/:id', function (req, res) {
  mailMannage.ReadContent(req.params.id, cbRouters(function (err, mail) {
    res.json(mail);
    return;
  }, res));
});

//写邮件
router.post('/mails', function (req, res) {
  switch (req.body.action) {
  case 'send':
    mailSend(req, res);
    break;
  }
});

module.exports = router;