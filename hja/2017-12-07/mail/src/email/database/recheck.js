var db = require('./db');
function recheck(username, cb) {
  db(function (con) {
    var sql = 'select * from user where username = ?';
    con.query(sql, username, function (err, result) {
      if (result[0]) {
        cb(true);
        con.end();
        return;
      }
      cb(false);
      con.end();
      return;
    });



  }, 'email');

}
module.exports = recheck;