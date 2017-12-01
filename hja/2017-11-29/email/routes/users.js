var express = require('express');
var app = express();
var router = express.Router();
var session = require('express-session');
app.use(session({ secret: "sosos" }));

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resourcessss');
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: '登录' });
});

router.get('/register', function (req, res, next) {
  //处理ajax
  
  res.render('register', { title: '注册' });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: '用户主页', name: req.session.user.username });
});

router.get('/logout', function (req, res, next) {
  //此时去除session
  req.session.user = null;
  res.redirect('/index');
});
module.exports = router;
