var mysql = require('mysql');
var init = function (cb, db) {
  var options = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'email'
  };
  if (db) {
    options.database = db;
  }
  var con = mysql.createConnection(options);
  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    cb instanceof Function && cb(con);
  });
};
if (!module.parent) {
  init();
}
module.exports = init;