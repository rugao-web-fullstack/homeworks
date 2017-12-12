var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: 'sosos' }));

/* GET users listing. */
router.get('/login', function (req, res) {
  res.render('users/login', { title: '登录' });
});

router.get('/register', function (req, res) {
  res.render('users/register', { title: '注册' });
});







module.exports = router;
