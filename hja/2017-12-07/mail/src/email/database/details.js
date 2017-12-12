var db = require('./db');
var debug = require('debug')('detail');
var cbs = require('./cb').cb;
function details(id, cb) {
  db(function (con) {

    var res = {};
    //根据id读邮件
    var sql1 = 'select * from mail where id = ?;';
    con.query(sql1, id, cbs(function (result) {
      res = result;
      var sql2 = 'UPDATE mail SET is_read = 1 where id = ?;';
      con.query(sql2, id, cbs(function (result) {
        debug(result);
        con.end();
        cb(false, res);

        return;
      }, cb));
    }, cb));

  }, 'email');

}
module.exports = details;