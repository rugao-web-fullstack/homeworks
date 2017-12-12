var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: 'sosos' }));
var debug = require('debug')('log');

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login');
  debug('log : ' + next);
});
router.get('/register', function (req, res, next) {
  res.render('register');
  debug('log : ' + next);
});

router.get('/home', function (req, res, next) {
  res.render('home', { name: req.session.user.username });
  debug('log : ' + next);
});




module.exports = router;
