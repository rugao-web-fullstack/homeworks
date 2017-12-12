var db = require('./db');
var cbs = require('./cb').cb;
function logincheck(username, password, cb) {
  db(function (con) {
    var sql = 'select password from user where username = ?';
    con.query(sql, username, cbs(function (result) {
      if (!result[0]) {
        cb(false, 0);
        con.end();
        return;
      } else {
        if (result[0].password === password) {
          cb(false, 1);
          con.end();
          return;
        } else {
          cb(false, 2);
          con.end();
          return;
        }
      }

    },cb));
  }, 'email');

}

module.exports = logincheck;