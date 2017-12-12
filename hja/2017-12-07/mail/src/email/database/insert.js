var db = require('./db');
var debug = require('debug')('insert');
var cbs = require('./cb').cb;
function insert(username, password, email, cb) {
  var id = [];
  con1();
  function con1() {
    db(function (con) {
      var sql = 'INSERT INTO user (username, password) VALUES ?;';
      var data = [
        [username, password]
      ];
      con.query(sql, [data], cbs(function (result) {
        debug(result);
        var sql2 = 'SELECT id  from user where username = ?;';
        con.query(sql2, username, cbs(function (result) {

          id.push(result[0].id);
          var sql3 = 'INSERT INTO mailbox (user, mailbox) VALUES ?;';
          let data3 = [
            [id[0], email]
          ];
          con.query(sql3, [data3], cbs(function (result) {
            debug(result);
            con.end();
            cb(false);

            return;

          }, cb));


        }, cb));


      }, cb));

    }, 'email');

  }








}

module.exports = insert;



