var basic = require('./basic');
var debug = require('debug')('xxx');
basic(function (con) {
  var sql = 'CREATE TABLE user (username VARCHAR(255), password VARCHAR(255))';
  con.query(sql, function (err) {
    if (err) throw err;
    debug('log' + 'Table created');
  
  });
}, 'mydb');

