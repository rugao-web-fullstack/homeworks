var basic = require('./basic');
var debug = require('debug')('xxx');
basic(function (con) {
  var sql = 'SELECT * FROM user WHERE password = \'Park Lane 38\'';
  con.query(sql, function (err, result) {
    if (err) throw err;
    debug('log' + result);
  });
}, 'mydb');

