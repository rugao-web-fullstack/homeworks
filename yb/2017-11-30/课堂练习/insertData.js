var base = require('./connectServer');
var debug = require('debug')('xxx');
base(function(con){
  var sql = 'INSERT INTO user (username, password) VALUES (\'cyb\', \'123\')';
  con.query(sql, function(err,res){
    if (err) throw err;
    debug('log:' + '1 record inserted');
    debug('log:' + res);
  });
},'mydb');