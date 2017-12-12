var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//   // next();
// });
router.get('/register', function(req, res) {
  res.render('register',{
    title:'注册'
  });
  // next();
});

router.get('/register/success', function(req, res) {
  //console.log(req.session.register);
  res.render('reg-log-result',{
    title:'注册成功',
    message:'恭喜注册成功，点击返回'
  });
  // next();
});
router.get('/register/failure', function(req, res) {
  //console.log(req.session.register);
  res.render('reg-log-result',{
    title:'注册失败',
    message:'您输入的用户名已经存在，请重新注册'
  });
  // next();
});


router.get('/login', function(req, res) {
  res.render('login',{
    title:'登录'
  });
  // next();
});
router.get('/login/success', function(req, res) {
  //console.log(req.session.login);
  res.render('main',{
    title:'登录成功',
    username:req.session.user
  });
  // next();
});
router.get('/login/failure', function(req, res) {
  //console.log(req.session.login);
  res.render('reg-log-result',{
    title:'登录失败',
    message:'您输入的用户名或密码错误，请重新登录'
  });
  // next();
});

module.exports = router;
