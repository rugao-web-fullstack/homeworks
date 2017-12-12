var db = require('./db');
var debug = require('debug')('detail');
function details(id, cb) {
  db(function (con) {

    var res = {};
    //根据id读邮件
    var sql1 = 'select * from mail where id = ?;';
    con.query(sql1, id, function (err, result) {
      // if (err) {
      //   // cb(true);
      //   // return;
      // }
      //这时更改状态
      res = result;
      var sql2 = 'UPDATE mail SET is_read = 1 where id = ?;';
      con.query(sql2, id, function (err, result) {
        // if (err) {
        //   // cb(true);
        //   // return;
        // }
        debug(result);
        con.end();
        cb(false, res);
        
        return;
      });
    });

  }, 'email');

}
module.exports = details;