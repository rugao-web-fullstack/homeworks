var express = require('express');
var router = express.Router();
//var User = require('../mov/user');

/* GET users listing. */
router.get('/login', function (req, res) {
  res.render('user/login', {
    title: '登录'
  });
});

router.get('/register', function (req, res) {
  res.render('user/register', {
    title: '注册'
  });
});

router.get('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
});
module.exports = router;