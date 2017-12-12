var express = require('express');
var router = express.Router();
// var login = require("../api/users/login");
// var register = require("../api/users/register");
// GET跳转
router.get('/main', function (req, res) {
  res.render('main',{title :'main'});
  return;
});

router.get('/register', function (req, res) {
  res.render('register',{title :'register'});
  return;
});

router.get('/login', function (req, res) {
  res.render('login',{title :'login'});
  return;
});
// POST
// router.post('/users/login', login);
// router.post('/users/register', register);

module.exports = router;
