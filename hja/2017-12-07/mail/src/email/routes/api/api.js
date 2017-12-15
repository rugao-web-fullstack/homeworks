var express = require('express');
var router = express.Router();
//引用user模块
var session = require('express-session');
var debug = require('debug')('api');
router.get(session({ secret: 'sosos' }));

//引用user模块
var UserMannager = require('../../database/user').Users;
//引用mail模块
var MailMannager = require('../../database/mails').Mails;

//用户区域
//用户登录
var UserLogin = function (username, password, req, res) {
  UserMannager.login(username, password, function (err, flag) {
    if (err) {
      if (flag === 0) {
        res.json(0);
        return;
      }
      res.json(1);
      return;
    }
    //设置session
    req.session.user = {};
    req.session.user.username = req.body.username;
    res.json('/users/home');
    // res.json(req.session.user.username);
    return;
  });
};
//用户注册
var UserAdd = function (username, password, email, req, res) {
  UserMannager.addUser(username, password, email, function (err) {
    // if (err) {
    //   res.json(0);
    //   return;
    // }
    debug(err);
    res.json('/users/login');
    return;


  });
};

//存在检测
router.get('/users/:name', function (req, res) {
  UserMannager.recheck(req.params.name, function (err) {
    if (err) {
      res.json(0);
      return;
    }
    res.json(1);

    return;
  });
});

router.post('/users', function (req, res) {
  // console.log(req.body);
  switch (req.body.action) {
  case 'login':
    UserLogin(req.body.username, req.body.password, req, res);
    break;
  case 'register':
    UserAdd(req.body.username, req.body.password, req.body.email, req, res);
    break;
    // default:
    //   break;
  }



});

//邮件区域
//邮件发送
var MailSend = function (sender, receiver, title, body, req, res) {
  MailMannager.sendMail(sender, receiver, title, body, function (err) {
    // if (err) {
    //   res.json('发送失败');
    //   return;
    // }
    //--重定向到主页
    debug(err);
    res.json('/users/home');
    return;
  });

};

//邮件读取
router.get('/mails/:receiver', function (req, res) {
  MailMannager.readAll(req.params.receiver, function (err, data) {
    // if (err) {
    //   res.json('请求失败');
    //   return;
    // }
    res.json(data);
    return;
  });
});

//单个邮件读取
router.get('/mails/detail/:id', function (req, res) {
  let id = req.params.id;
  MailMannager.detail(id, function (err, data) {
    // if (err) {
    //   return;
    // }
    res.json(data);
    return;
  });
});

router.post('/mails', function (req, res) {
  switch (req.body.action) {
  case 'post':
    MailSend(req.body.sender, req.body.receiver, req.body.title, req.body.body, req, res);
    break;
    // default:
    //   break;
  }

});





module.exports = router;