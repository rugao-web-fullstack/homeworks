var db = require('./db');
var debug = require('debug')('insert');
function insert(username, password, email, cb) {
  var id = [];
  con1();
  function con1() {
    db(function (con) {
      var sql = 'INSERT INTO user (username, password) VALUES ?;';
      var data = [
        [username, password]
      ];
      con.query(sql, [data], function (err, result) {
        // if (err) {

        //   return;
        // }
        debug(err);
        debug(result);
        var sql2 = 'SELECT id  from user where username = ?;';
        con.query(sql2, username, function (err, result) {
          // if (err) {
          //   return;
          // }
          debug(err);
          id.push(result[0].id);
          var sql3 = 'INSERT INTO mailbox (user, mailbox) VALUES ?;';
          let data3 = [
            [id[0], email]
          ];
          con.query(sql3, [data3], function (err) {
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
      
    }, 'email');

  }








}

module.exports = insert;



