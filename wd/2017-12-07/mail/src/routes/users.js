var express = require('express');
var router = express.Router();

router.get('/register', function (req, res) {
  res.render('register',{title :'Register'});
  return;
});

router.get('/login', function (req, res) {
  res.render('login',{title :'Login'});
  return;
});

router.get('/main', function (req, res) {
  res.render('main',{title :'Main'});
  return;
});


module.exports = router;
