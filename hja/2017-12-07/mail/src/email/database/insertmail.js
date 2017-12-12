var db = require('./db');
var debug = require('debug')('insertmails');
var cbs = require('./cb').cb;
function insert(receiver, sender, title, content, cb) {
  var mid = [];
  var sid = [];
  var bid = [];
  db(function (con) {
    var sql = 'INSERT INTO mail (receiver, sender, title, content, is_read) VALUES ?;';
    var data = [
      [receiver, sender, title, content, 0]
    ];
    con.query(sql, [data], cbs(function (result) {
      mid.push(result.insertId);
      var sql3 = 'SELECT id from user where username = ?;';
      con.query(sql3, receiver, cbs(function(result) {
        sid.push(result[0].id);
        var sql4 = 'SELECT id from mailbox where user = ?;';
        con.query(sql4, sid[0], cbs(function(result) {
          bid.push(result[0].id);
          var sql5 = 'INSERT INTO mail_emailbox (mailbox, mail) VALUES ?;';
          var datas = [
            [bid[0], mid[0]]
          ];
          con.query(sql5, [datas], cbs(function(result) {
            debug(result);
            con.end();
            cb(false);

            return;

          },cb));

        },cb));

      },cb));


    },cb));
    return;

  }, 'email');

}

module.exports = insert;