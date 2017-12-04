var debug = require('debug')('xxx');
var base = require('../base');

//拿到邮件列表-------收件箱
function mid_list(req, res) {
  
  //-----------就是目前登陆的用户
  var receiver = 's';
  base(function (con) {
    var sql2 = 'select * from sender_reciver   where receivername  = \'' + receiver + '\'';
    con.query(sql2, function (err, result) {
      if (err) {
        debug('失败');
        return false;
      }
      //返回一组数据  
      // console.log(result);
      debug(result);

      //区别已读 和 未读 邮件
      // 放入两个数组内;
      res.end();
            
            
    });
  }, 'mailsys');

}

module.exports = mid_list;