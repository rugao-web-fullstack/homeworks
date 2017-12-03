var express = require('express');
var userManage = require("../user.js");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {});
});

//用户登录处理
router.post("/", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  //检测用户名和密码

  userManage.checkUser(username, password, function (err) {
    if (!err) {
      //登陆成功
      req.session.username = username;
      res.redirect("/users");
    } else {
      //登陆失败
      res.render('login', {
        "message": "账号密码输入错误！"
      });
    }
  })
})

module.exports = router;