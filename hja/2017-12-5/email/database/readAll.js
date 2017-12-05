var db = require('./db');
function readAll(username, cb) {
  db(function (con) {
    //根据用户名获取邮件
    var sql1 = 'select * from mail where receiver = ?';
    con.query(sql1, username, function (err, result) {
      if (err) {
        cb(true);
        return;
      }
      cb(false, result);
      return;
    });

  }, 'email');

}
module.exports = readAll;