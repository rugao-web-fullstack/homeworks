var db = require('./db');
var cbs = require('./cb').cb;
function readAll(username, cb) {
  db(function (con) {
    //根据用户名获取邮件
    var sql1 = 'select * from mail where receiver = ?';
    con.query(sql1, username, cbs(function (result) {

      cb(false, result);
      con.end();
      return;
    },cb));

  }, 'email');

}
module.exports = readAll;