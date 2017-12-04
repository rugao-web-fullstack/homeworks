var base = require('./base');
var debug = require('debug')('register');
module.exports = function (req, res) {
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
        res.redirect('/');
      } else {
        debug('log' + '用户存在！');
        res.redirect('/register');
      }
    });
  }, 'mydb');
};
