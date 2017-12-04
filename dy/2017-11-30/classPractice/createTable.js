var basic = require('./base');
var debug = require('debug')('log');

basic(function (con) {
  var sql = 'CREATE Table user (username VARCHAR(20), password VARCHAR(64))';
  con.query(sql, function (err) {
    if (err) throw err;
    debug('log' + 'Table created');
  });
}, 'mydb');