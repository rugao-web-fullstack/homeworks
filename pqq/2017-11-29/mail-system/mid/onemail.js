var debug = require('debug')('xxx');
var base = require('../base');

//拿到邮件列表-------收件箱
function mid_list(req, res) {
  // console.log(req.body);
  //-----------前台点击  获得当前邮件的 mailid 

  var mailid = mailid;

  base(function (con) {
    var sql = 'select * from mailtext   where mailid  = \'' + mailid + '\'';
    con.query(sql, function (err, result) {
      if (err) {
        return false;
      }
      debug(result);
      //返回一组数据  
      // console.log(result);
      // var title = result[0].title;
      // var content = result[0].content;

      //返回前台





      res.end();

    });
  }, 'mailsys');

}

module.exports = mid_list;