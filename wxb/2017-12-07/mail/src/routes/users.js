var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function (res) {
  res.render('register');
});

router.get('/login', function (res) {
  res.render('login');
});

router.get('/mail', function (res) {
  res.render('mail');
});

router.get('/mail/write', function (res) {
  res.render('writeMail');
});

router.get('/mail/all', function (res) {
  res.render('writeMail');
});

/* POST users data. */
//---用户注册
router.post('/register-add', function () {

});

//---用户登录
router.post('/login-confirm', function () {

});

module.exports = router;
