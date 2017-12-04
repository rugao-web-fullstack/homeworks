var base = require('./base');
var debug = require('debug')('log');

base(function (con) {
  var sql = 'CREATE DATABASE mydb';
  con.query(sql, function (err) {
    if (err) throw err;
    debug('log' + 'Database created');
  });
});