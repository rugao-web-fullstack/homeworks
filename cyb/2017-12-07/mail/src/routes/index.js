var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {//未登录
  res.render('main', {
    title: '欢迎页面',
    username: req.session.user
  });
});
router.get('/main', function (req, res) {//已登录
  res.render('main', {
    title: '主页',
    username: req.session.user
  });
});

module.exports = router;