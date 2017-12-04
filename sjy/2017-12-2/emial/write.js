var base = require('./base');
var debug = require('debug')('xxx');
module.exports = function (req, res) {
  var receiver=req.body.email;
  var mailtitle = req.body.title;  
  var mailbody = req.body.cont;
  base(function (con) {
    var sql2='select * from user where address =\''+receiver+'\'';
    con.query(sql2, function (err, result) {
      if (err) throw err;
      if(result.length === 0){
        debug('log:' + 'receiver does not exist! Please retype');
        res.redirect('/write');
      }else{
        var sql = 'insert into mail(title,body,receiver) values(\''+mailtitle+'\',\''+mailbody+'\',\''+receiver+'\')';
        con.query(sql, function (err, result) {
          if (err) throw err;
          debug('log:' + result);
          res.redirect('/main');
        });
      }
			
    });
		
  }, 'mydb');
};
