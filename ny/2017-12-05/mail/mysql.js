var mysql = require('mysql');
var debug = require('debug')('connect');
var init = function (cb, db) {
  var options = {
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'mydb'
  };
  if (db) {
    options.database = db;
  }
  var con = mysql.createConnection(options);
  con.connect(function (err) {
    if (err) throw err;
    debug('log' + 'Connected!');
    cb instanceof Function && cb(con);
  });
};
if (!module.parent) {
  init();
}
module.exports = init;
