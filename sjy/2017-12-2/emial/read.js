var base = require('./base');
var debug = require('debug')('xxx');
module.exports = function () {
  base(function (con) {
    var sql='select * from mail where receiver =\'3@qq.com\'';
    con.query(sql, function (err, result) {
      if (err) throw err;
      if(result.length === 0){
        debug('log:' + 'empty mailbox');
      }else{
        debug('log:' + result);
      }
            
    });
		
  }, 'mydb');
};
