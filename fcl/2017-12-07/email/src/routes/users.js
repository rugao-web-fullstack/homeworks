var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: '12345' }));

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: "login" });
});
router.get('/register', function (req, res, next) {
  res.render('register', { title: "register" });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: "home" });
});
module.exports = router;
