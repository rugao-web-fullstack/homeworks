var db = require('./db');
function logincheck(username, password, cb) {
  db(function (con) {

    var sql = 'select password from user where username = ?';
    con.query(sql, username, function (err, result) {
      if (err) {
        cb(true);
        return;
      } else {
        if (!result[0]) {
          cb(false, 0);
          return;
        } else {
          if (result[0].password === password) {
            cb(false, 1);
            return;
          } else {
            cb(false, 2);
            return;
          }
        }
      }
    });
  }, 'email');

}

module.exports = logincheck;