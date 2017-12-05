var base = require('./connectServer');
var debug = require('debug')('xxx');
base(function(con){
  var sql = 'CREATE TABLE user (username VARCHAR(20), password VARCHAR(20))';
  con.query(sql, function(err,res){
    if (err) throw err;
    debug('log:' + 'Table created!');
    debug('log:' + res);
  });
},'mydb');