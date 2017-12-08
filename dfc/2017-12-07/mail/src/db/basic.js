var mysql = require('mysql');
var debug = require('debug')('dmail');

// var cbFunc = function cbFunc(cb) {
//   return function (err) {
//     if (err) {
//       throw err;
//     }
//     if (cb instanceof Function) {
//       cb;
//     }
//   };
// };
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
  // con.connect(cbFunc(cb));
  con.connect(function(err){
    // if(err) throw err;
    debug('log:' + 'Connected!');
    cb instanceof Function && cb(con);
  });
};
// if(!module.parent) {
// init();
// }
module.exports = init;
// module.exports.cbFunc = cbFunc;