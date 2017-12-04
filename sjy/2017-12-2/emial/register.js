var base = require('./base');
var debug = require('debug')('xxx');
module.exports = function (req, res) {
  var username = req.body.username;  
  var password = req.body.password;
  var address = req.body.address;
	
  base(function (con) {
    var sql = 'select * from user where username = \'' + username +'\'';
    con.query(sql, function (err, result) {
      if (err) throw err;
      debug('log:' + result);
      if(result.length === 0){
        base(function (con1) {
          var sqlIn = 'INSERT INTO user (username , password , address) values (\'' + username + '\', \'' + password + '\',\''+address+'\')';
          con1.query(sqlIn, function (error){
            if (error) throw error;
            debug('log:' + 'use registed');
          });
        }, 'mydb');
        res.redirect('/');
      } else {
        debug('log:' + '用户存在！');
        res.redirect('/register');
      }
    });
  }, 'mydb');
};
