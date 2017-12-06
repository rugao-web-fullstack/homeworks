var init = require('../db/db');
var debug = require('debug')('log');
var mail = {};


//查询收件人是否存在
mail.CheckReceiver = function (receiver, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM user where username = ?';
    con.query(sql, receiver, function (err, result) {
      if (err) {
        cb(true);
      } else {
        if (!result[0]) {
          cb(true);
        } else {
          cb(false);
        }
      }
    });
  }, 'email');
};

//发送邮件
mail.Send = function (sender, receiver, title, content, iread, cb) {
  init(function (con) {
    var sql1 = 'INSERT INTO mail (sender, receiver, title, content, iread) VALUES ?;';
    var data = [
      [sender, receiver, title, content, iread]
    ];
    con.query(sql1, [data], function (err, result) {
      debug('log : '+result);
      if (err) {
        cb(true);
      } else {
        var mailid = result.insertId;
        // console.log('邮件详情插入成功');
        debug('log : '+'邮件详情插入成功');
        //根据收件人查收件人ID，再查到mailbox的id。
        var sql2 = 'SELECT id FROM user where username = ?;';
        var sql3 = 'SELECT id FROM user_mailbox where user = ?;';
        con.query(sql2, receiver, function (err, result) {
          if (err) {
            cb(true);
            return;
          } else {
            var userid = result[0].id;
            con.query(sql3, userid, function (err, result) {
              if (err) {
                cb(true);
                return;
              } else {
                var mailboxid = result[0].id;
                var sql4 = 'INSERT INTO mail_mailbox (mailbox, mail) VALUES ?;';
                var data2 = [
                  [mailboxid, mailid]
                ];
                con.query(sql4, [data2], function (err, result) {
                  debug('log : '+result);
                  if (err) {
                    cb(true);
                    return;
                  } else {
                    // console.log('邮件插入邮箱成功！');
                    debug('log : '+'邮件插入邮箱成功！');
                    cb(false);
                    return;
                  }
                });
              }
            });

          }
        });
      }
    });
  }, 'email');
};


//查看邮件列表
mail.Read = function (username, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM mail where receiver = ?;';
    con.query(sql, username, function (err, result) {
      if (err) {
        cb(true);
        return;
      } else {
        cb(false, result);
        return;
      }
    });
  }, 'email');
};



//查看邮件详情

mail.ReadContent = function (mailid, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM mail where id = ?;';
    con.query(sql, mailid, function (err, result) {
      if (err) {
        cb(true);
        return;
      } else {
        var mailresult = result;
        var sql2 = 'UPDATE mail SET iread = 1 where id = ?;';
        con.query(sql2, mailid, function (err, result) {
          debug('log : '+result);
          if (err) {
            cb(true);
            return;
          } else {
            cb(false, mailresult);
            return;
          }
        });
        return;
      }
    });
  }, 'email');
};



module.exports = mail;




