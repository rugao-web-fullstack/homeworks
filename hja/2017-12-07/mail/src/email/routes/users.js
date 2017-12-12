var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get(session({ secret: 'sosos' }));

/* GET users listing. */
// router.get('/', function (req, res) {
//   res.send('respond with a resourcessss');
// });

router.get('/login', function (req, res) {
  res.render('users/login', { title: '登录' });
});

router.get('/register', function (req, res) {
  res.render('users/register', { title: '注册' });
});

router.get('/home', function (req, res) {
  res.render('users/home', { title: '用户主页', name: req.session.user.username });
});

router.get('/logout', function (req, res) {
  //此时去除session
  req.session.user = null;
  res.redirect('/');
});






module.exports = router;
