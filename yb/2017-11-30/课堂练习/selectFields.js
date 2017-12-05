var base = require('./connectServer');
var debug = require('debug')('xxx');
base(function (con) {
  var sql = 'select username from user;';
  con.query(sql, function(err,res){
    if (err) throw err;
    debug('log:' + res);
    res.forEach(function(item) {
      debug('log:' + item.username);
    });
  });
}, 'mydb');