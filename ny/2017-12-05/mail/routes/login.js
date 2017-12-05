var express = require('express');
var router = express.Router();
var base = require('../mysql');
var debug = require('debug')('login');
/* GET login. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录' });
  next();
});
router.post('/', function (req, res, next) {
  var username = req.body.username;  
  var password = req.body.password;
  base(function (con) {
    var sql = 'select * from user where user = \'' + username +'\'';
    con.query(sql, function (err, result) {
      if (err) throw err;
      if(result.length === 0){
        debug('log' + '用户名不存在！');
        res.redirect('/');
      } else {
        result.forEach(function (item){
          if (item.password !== password){
            debug('log' + '密码不正确！');
            res.redirect('/');
          } else {
            res.cookie('name', username);
            debug('log' + 'user ' + username + ' login in');
            res.redirect('/main');
          }
        });
      }
    });
  }, 'mydb');
  next();
});
module.exports = router;
