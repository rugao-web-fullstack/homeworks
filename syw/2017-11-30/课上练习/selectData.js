var basic = require('./basic');
var debug = require('debug')('xxx');
basic(function (con) {
  var sql = 'select * from user;';
  con.query(sql, function (err, result) {
    if (err) throw err;
    debug('log' + result);
    
  });
}, 'mydb');

