var mysql = require('mysql');
var debug = require('debug')('db');
var connect = false;
var init = function (cb, db) {
  var options = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  };

  options.database = db;

  var con = mysql.createConnection(options);
  if (connect) {
    cb instanceof Function && cb(con);
    return;
  }
  con.connect(function (err) {
    debug(err);
    connect = true;
    cb instanceof Function && cb(con);
    return;
  });
};

// init();

module.exports = init;