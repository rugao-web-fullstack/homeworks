var express = require('express');
var router = express.Router();

//引用session模块
var session = require('express-session');
router.get(session({ secret: '12345' }));

// 引用用户管理模块
var userMannage = require('../operation/usermannage');
//引用邮件管理模块
var mailMannage = require('../operation/mailmannage');


//用户登录
var userLogin = function (req, res) {
  userMannage.Login(req.body.username, req.body.password, function (err) {
    if (err) {
      
      res.send('0');
      return;
    } else {
      // console.log(req.session);
      req.session.user = req.body;
      res.send('/users/home');
      return;
    }
  });
};


//注册部分
var userRegister = function (req, res) {
  userMannage.Register(req.body.username, req.body.password, req.body.mailbox,
    function (err) {
      if (err) {
        res.send('0');
        return;
      } else {
        res.send('/users/login');
        return;
      }
    });
};

//注册用户名查重，邮件查看是否有此收件人
router.get('/users/:name', function (req, res) {
  userMannage.CheckUser(req.params.name, function (err) {
    if (err) {
      res.send('0');
      return;
    } else {
      res.send('1');
      return;
    }
  });
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

var mailSend = function (req, res) {
  mailMannage.Send(req.body.sender, req.body.receiver, req.body.title, req.body.content, req.body.iread, function (err) {
    if (err) {
      res.send('0');
      return;
    } else {
      res.send('/users/home');
      return;
    }
  });
};

//读邮件
router.get('/read/:name', function (req, res) {
  mailMannage.Read(req.params.name, function (err, maillist) {
    if (err) {
      res.send('0');
      return;
    } else {
      res.send(maillist);
      return;
    }
  });
});

//读取邮件详情
router.get('/readcontent/:id', function (req, res) {
  mailMannage.ReadContent(req.params.id, function (err, mail) {
    if (err) {
      res.send('0');
      return;
    } else {
      res.send(mail);
      return;
    }
  });
});

//写邮件
router.post('/mails', function (req, res) {
  switch (req.body.action) {
  case 'send':
    mailSend(req, res);
    break;
  case 'register':
    userRegister(req, res);
      
    break;
  }
});

module.exports = router;