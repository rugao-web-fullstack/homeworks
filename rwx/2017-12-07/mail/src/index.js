var mysql = require('mysql');
var assert = require('assert');
var options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
};
var con = mysql.createConnection(options);
exports.mysql = function(cb) {
  assert(cb instanceof Function);
  con.connect(function (err) {
    assert(!err);
    cb(con);
  });
};
exports.hello = 'hello';
