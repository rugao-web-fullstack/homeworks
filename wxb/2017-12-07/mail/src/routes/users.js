var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/mail', function (req, res) {
  res.render('mail');
});

router.get('/mail/write', function (req, res) {
  res.render('writeMail');
});

router.get('/mail/all', function (req, res) {
  res.render('writeMail');
});


module.exports = router;
