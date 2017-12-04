var express = require('express');
var userManage = require('../user.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('register', {});
});

//用户注册处理
router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  //检测用户名和密码
  userManage.addUser(username, password, function (err) {
    if (!err) {
      //注册成功
      res.redirect('/');
    } else {
      //注册失败
      res.render('register', {
        'message': '用户名已经被注册了！'
      });
    }
  });
});


module.exports = router;