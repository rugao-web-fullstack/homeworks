var basic = require('./basic');
var debug = require('debug')('xxx');
basic(function (con) {
  con.query('CREATE DATABASE mydb', function (err) {
    if (err) throw err;
    debug('log' + 'Database created');
 
  });
});

