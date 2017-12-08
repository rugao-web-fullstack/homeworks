var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: '12345' }));
var debug = require('debug')('log');

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/home', function (req, res, next) {
  res.render('home', { name: req.session.user.username });
});
module.exports = router;
