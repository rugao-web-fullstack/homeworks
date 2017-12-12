var db = require('./db');
var cbs = require('./cb').cb;
function recheck(username, cb) {
  db(function (con) {
    var sql = 'select * from user where username = ?';
    con.query(sql, username, cbs(function (result) {
      if (result[0]) {
        cb(true);
        con.end();
        return;
      }
      cb(false);
      con.end();
      return;
    },cb));



  }, 'email');

}
module.exports = recheck;