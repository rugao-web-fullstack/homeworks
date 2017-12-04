var express = require('express');
var mailManage = require("../mail.js");
var userManage = require("../user.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var username = req.session.username;
  if (username) {
    mailManage.getMail(username, function (err,mailArr) {
      res.render('user', {mailArr: mailArr||{}});
    })
  } else {
    res.redirect("/");
  }

});

router.post('/', function (req, res, next) {
  var sender = req.session.username;
  var receiver = req.body.receiver;
  var title = req.body.title;
  var content = req.body.content;
  var username = req.session.username;

  userManage.isExist(receiver,function(err){
    if(!err){
      //用户存在
      mailManage.addMail(sender,receiver,title,content, function () {
        mailManage.getMail(username, function (err,mailArr) {
          res.render('user', {mailArr: mailArr||{},"message":"消息发送成功！"});
        })
      });
    }else{
      mailManage.getMail(username, function (err,mailArr) {
        res.render('user', {mailArr: mailArr||{},"message":"用户不存在！"});
      })
    }
  })

});

module.exports = router;