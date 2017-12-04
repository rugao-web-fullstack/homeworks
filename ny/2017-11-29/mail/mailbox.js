var base = require('./base');
var debug = require('debug')('mailbox');
var getCookie = require('./getCookie');
module.exports = function (req, res) {
  var mailbox = req.body.mailbox; 
  var cookieString = req.headers.cookie;
  var user = getCookie(cookieString, 'name'); 
  base(function (con) {
    var sql = 'select * from mailbox where mailbox = \'' + mailbox +'\'';
    con.query(sql, function (err, result) {
      if (err) throw err;
      if(result.length === 0){
        base(function (con1) {
          var sqlIn = 'INSERT INTO mailbox (mailbox , user) values (\'' + mailbox + '\', \'' + user + '\')';
          con1.query(sqlIn, function (error){
            if (error) throw error;
            debug('log' + 'mailbox added');
          });
        }, 'mydb');
        res.redirect('/mail');
      } else {
        debug('log' + '邮箱存在！');
        res.redirect('/mailboxAdd');
      }
    });
  }, 'mydb');
};
