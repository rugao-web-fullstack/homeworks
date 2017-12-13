var express = require('express');
var router = express.Router();

router.get('/main', function (req, res) {
  res.render('main',{title :'main'});
  return;
});
router.get('/login', function (req, res) {
  res.render('login',{title :'login'});
  return;
});
router.get('/register', function (req, res) {
  res.render('register',{title :'register'});
  return;
});
router.get('/logout', function (req, res) {
  res.render('login',{title :'login'});
  return;
});

module.exports = router;
