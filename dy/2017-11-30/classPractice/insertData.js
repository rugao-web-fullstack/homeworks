var basic = require('./base');
var debug = require('debug')('log');

basic(function (con) {
  var sql = 'INSERT INTO user (username, password) VALUES(\'username11\', \'password123\')';
  con.query(sql, function (err, result) {
    if (err) throw err;
    debug('log' + '1 record inserted');
    debug('log' + result);
  });
}, 'mydb');