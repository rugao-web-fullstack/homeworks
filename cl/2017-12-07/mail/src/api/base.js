var mysql = require('mysql');
var debug = require('debug')('xxx');

var init = function (cb, db) {
  var options = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  };
    //   if (db) {
    //     options.database = db;
    //   }
  debug('info:' + db);
  var con = mysql.createConnection(options);
  con.connect(function (err) {
    debug('error:' + err);
    debug('log:' + 'Database Connected!');
    cb instanceof Function && cb(con);
  });
};
exports.init = init;