var express = require('express');
var router = express.Router();
//var session = require('express-session');
//router.get(session({ secret: 'sosos' }));

//判断是否有session.user
router.get('/', function (req, res) {
  //判断session是否存在
  //if (req.session.user) {
    res.render('main', {
      title: '主页',
      username: req.session.user
    });
  //} else {
    //res.render('index', { title: '欢迎' });
  //}
});

module.exports = router;
