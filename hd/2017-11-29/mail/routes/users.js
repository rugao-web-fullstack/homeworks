var express = require('express');
var mailManage = require('../mail.js');
var debug = require('debug');

var mailboxManage = require('../mailbox.js');
var router = express.Router();

//判断用户是否登陆
router.use('/', function (req, res, next) {
  var username = req.session.username;
  if (username) {
    next();
  } else {
    res.redirect('/');
  }
});

/* GET users listing. */
router.get('/', function (req, res) {
  renderUserPage(req, res);
});

//添加邮件
router.post('/', function (req, res, next) {
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var title = req.body.title;
  var content = req.body.content;


  debug(sender, receiver);

  if (receiver) {
    mailManage.addMail(sender, receiver, title, content, function (err) {
      if (err) {
        renderUserPage(req, res, '用户不存在！');
      } else {
        renderUserPage(req, res, '消息发送成功！');
      }
    });
  } else {
    next();
  }
});

//对添加邮箱post请求的处理
router.post('/', function (req, res) {
  var username = req.session.username;
  var mailbox = req.body.mailbox;

  mailboxManage.addMailBox(username, mailbox, function (err) {
    if (err) {
      renderUserPage(req, res, '该邮箱已被占用！');
    } else {
      renderUserPage(req, res, '邮箱添加成功！');
    }
  });
});


function renderUserPage(req, res, msg) {
  var options = {};
  var username = req.session.username;
  options.username = username;
  if (msg) {
    options.message = msg;
  }
  mailManage.getMail(username, function (err, mailArr) {
    options.mailArr = mailArr;
    mailboxManage.getMailBox(username, function (err, mailbox) {
      options.mailbox = mailbox;
      res.render('user', options);
    });
  });
}

module.exports = router;