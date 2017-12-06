var express = require('express');
var router = express.Router();
var base = require('../mysql');
var debug = require('debug')('register');
/* GET register. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '注册' });
  next();
});
router.post('/', function (req, res, next) {
  var name = req.body.name;  
  var pwd = req.body.pwd;
  base(function (con) {
    var sql = 'select * from user where user = \'' + name +'\'';
    con.query(sql, function (err, result) {
      if (err) throw err;
      debug('log' + result);
      if(result.length === 0){
        base(function (con1) {
          var sqlIn = 'INSERT INTO user (user , password) values (\'' + name + '\', \'' + pwd + '\')';
          con1.query(sqlIn, function (error){
            if (error) throw error;
            debug('log' + 'use registed');
          });
        }, 'mydb');
        res.redirect('/login');
      } else {
        debug('log' + '用户存在！');
        res.redirect('/register');
      }
    });
  }, 'mydb');
  next();
});
module.exports = router;
