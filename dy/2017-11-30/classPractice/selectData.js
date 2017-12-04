var basic = require('./base');
var debug = require('debug')('log');

basic(function (con) {
  var sql = 'select * from user;';
  con.query(sql, function (err, result) {
    if (err) throw err;
    debug('log' + result);
  });
}, 'mydb');