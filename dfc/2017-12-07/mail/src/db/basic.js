var mysql = require('mysql');
var debug = require('debug')('dmail');

var init = function (cb, db) {
  var options = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  };
  if (db) {
    options.database = db;
  }
  var con = mysql.createConnection(options);
  con.connect(function(err){
    debug('error:' + err);
    debug('log:' + 'Connected!');
    cb instanceof Function && cb(con);
  });
};
// if(!module.parent) {
// init();
// }
module.exports = init;