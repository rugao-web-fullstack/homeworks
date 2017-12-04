var base = require('../base');
var debug = require('debug')('xxx');


function sendmail(title, content, receiver, sender) {

  //先对收件者进行 user 表的验证-----确定存在该用户


  base(function (con) {
    // console.log(receiver);
    var sql1 = 'select * from users  where username = \'' + receiver + '\'';
    con.query(sql1, function (err, result) {
      if (err) {
        debug('查询fail');
        // console.log('失败查询用户');
        throw err;        
      }
      if (result.length == 1) {
        debug('查询成功');



        base(function (con) {
          // console.log();
          debug('进入插入数据了');

          var sql2 = 'insert into sender_receiver (sendername, receivername,title,content) VALUES(\'' + sender + '\', \'' + receiver + '\', \'' + title + '\', \'' + content + '\');';

          con.query(sql2, function (err, result) {
            if (err) {
              // console.log('失败失败');
              debug('fail');
              throw err;
            }
            debug(result);
            return true;

          });
        }, 'mailsys');
      }
    });
  }, 'mailsys');
}


module.exports = sendmail;