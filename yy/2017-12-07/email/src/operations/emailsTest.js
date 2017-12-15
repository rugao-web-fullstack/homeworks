var base = require('../emaildb/base').init;

var cb = require('./cb').cb;
function Email() { }

Email.prototype.write = function (req, res) {
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var title = req.body.title;
  var content = req.body.content;
  //向email中插入邮件内容
  base(function (con) {
    var sql = 'INSERT INTO email (senderAddress,receiverAddress,title,content) VALUES(\'' + sender + '\',\'' + receiver + '\',\'' + title + '\',\'' + content + '\');';
    con.query(sql, cb(function (result) {
      //   if (err) throw err;
      var emailId = result.insertId;
      //根据收件人查询邮箱id
      base(function (con) {
        var sql = 'select * from emailbox  where address=\'' + receiver + '\';';
        con.query(sql, cb(function (result) {
          //   if (err) throw err;
          if (result[0]) {
            var eBoxId = result[0].id;
            //记录邮件与邮箱的关系，即email_ebox表
            base(function (con) {
              var sql = 'INSERT INTO email_ebox (email,ebox) VALUES(\'' + emailId + '\',\'' + eBoxId + '\');';
              con.query(sql, cb(function () {
                //      if (err) throw err;
                //发送成功（邮件成功存入数据库）
                // res.render('send-success.html');
                res.redirect('/email/send/success');
              }));
            }, 'emaildb');
          } else {
            //收件人不存在
            res.redirect('/email/send/failure');
          }
        }));
      }, 'emaildb');
    }));
  }, 'emaildb');
};
var emails = [];
Email.prototype.read = function (req, res, cb) {
  req.body.user = req.session.user;
  base(function (con) {
    var sql = 'select * from user  where username=\'' + req.body.user + '\';';
    con.query(sql, cb(function (result) {
      //   if (err) throw err;
      // console.log(result);
      var userId = result[0].id;
      base(function (con) {
        var sql = 'select * from emailbox  where user=\'' + userId + '\';';
        con.query(sql, cb(function (result) {
          //   if (err) throw err;
          var eboxId = result[0].id;
          base(function (con) {
            var sql = 'select * from email_ebox  where ebox=\'' + eboxId + '\';';
            con.query(sql, cb(function (result) {
              //   if (err) throw err;

              for (let k = 0; k < result.length; k++) {
                var emailNum = result.length;
                let emailId = result[k].email;
                base(function (con) {
                  var sql = 'select * from email  where id=\'' + emailId + '\';';
                  con.query(sql, cb(function (result) {
                    //   if (err) throw err;
                    emails.push(result);
                    if (k === emailNum - 1) {
                      cb(false, emails);
                    }
                  }));
                }, 'emaildb');
              }
            }));
          }, 'emaildb');
        }));
      }, 'emaildb');
    }));
  }, 'emaildb');

};
exports.Email = Email;
