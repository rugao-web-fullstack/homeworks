var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: 'sosos' }));

//判断是否有session.user
router.get('/', function (req, res) {
  //判断session是否存在
  if (req.session.user) {
    //转入home路由
    res.redirect('/users/home');
    return;

    // res.redirect('/users/home');
  } else {
    res.render('index', { title: '主页' });
  }
});

module.exports = router;
