var express = require('express');
var router = express.Router();

router.get('/register', function (req, res) {
  res.render('register',{title :'注册'});
  return;
});

router.get('/login', function (req, res) {
  res.render('login',{title :'登录'});
  return;
});

router.get('/main', function (req, res) {
  res.render('main',{title :'主页'});
  return;
});


module.exports = router;
