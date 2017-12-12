var db = require('./db');
var debug = require('debug')('insertmails');
function insert(receiver, sender, title, content, cb) {
  var mid = [];
  var sid = [];
  var bid = [];
  db(function (con) {
    var sql = 'INSERT INTO mail (receiver, sender, title, content, is_read) VALUES ?;';
    var data = [
      [receiver, sender, title, content, 0]
    ];
    con.query(sql, [data], function (err, result) {
      // if (err) {
      //   cb(true);
      //   return;
      // }
      // console.log(result);
      debug(err);
      mid.push(result.insertId);
      var sql3 = 'SELECT id from user where username = ?;';
      con.query(sql3, receiver, function (err, result) {
        // if (err) {
        //   cb(true);
        //   return;
        // }
        debug(err);
        sid.push(result[0].id);
        var sql4 = 'SELECT id from mailbox where user = ?;';
        con.query(sql4, sid[0], function (err, result) {
          // if (err) {
          //   cb(true);
          //   return;
          // }
          debug(err);
          bid.push(result[0].id);
          var sql5 = 'INSERT INTO mail_emailbox (mailbox, mail) VALUES ?;';
          var datas = [
            [bid[0], mid[0]]
          ];
          con.query(sql5, [datas], function (err) {
            // if (err) {
            //   cb(true);
            //   return;
            // }
            debug(err);
            con.end();
            cb(false);
            
            return;

          });

        });

      });


    });
    return;

  }, 'email');

}

module.exports = insert;