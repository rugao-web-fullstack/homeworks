var base = require('./connectServer');
var debug = require('debug')('xxx');
base(function(con){
  var sql = 'CREATE DATABASE mydb';
  con.query(sql, function(err,res){
    if (err) throw err;
    debug('log:' + 'Database created!');
    debug('log:' + res);
  });
});
