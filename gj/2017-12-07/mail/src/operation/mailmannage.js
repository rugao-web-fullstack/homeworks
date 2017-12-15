var init = require('../db/db').init;
var debug = require('debug')('log');
var cbFunc = require('./cb').cbMannage;
var mail = {};

//发送邮件
mail.Send = function (sender, receiver, title, content, iread, cb) {
  init(function (con) {
    var sql1 = 'INSERT INTO mail (sender, receiver, title, content, iread) VALUES ?;';
    var data = [
      [sender, receiver, title, content, iread]
    ];
    con.query(sql1, [data], cbFunc(function (result) {
      debug('log : ' + result);
      var mailid = result.insertId;
      // console.log('邮件详情插入成功');
      debug('log : ' + '邮件详情插入成功');
      //根据收件人查收件人ID，再查到mailbox的id。
      var sql2 = 'SELECT id FROM user where username = ?;';
      var sql3 = 'SELECT id FROM user_mailbox where user = ?;';
      con.query(sql2, receiver, cbFunc(function (result) {
        var userid = result[0].id;
        con.query(sql3, userid, cbFunc(function (result) {
          var mailboxid = result[0].id;
          var sql4 = 'INSERT INTO mail_mailbox (mailbox, mail) VALUES ?;';
          var data2 = [
            [mailboxid, mailid]
          ];
          con.query(sql4, [data2], cbFunc(function (result) {
            debug('log : ' + result);
            // console.log('邮件插入邮箱成功！');
            debug('log : ' + '邮件插入邮箱成功！');
            con.end();
            cb(false);
            return;
          }));
        }));
      }
      ));
    }
    ));
  }, 'email');
};


//查看邮件列表
mail.Read = function (username, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM mail where receiver = ?;';
    con.query(sql, username, cbFunc(function (result) {
      con.end();
      cb(false, result);
      return;
    }));
  }, 'email');
};



//查看邮件详情
mail.ReadContent = function (mailid, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM mail where id = ?;';
    con.query(sql, mailid, cbFunc(function (result) {
      var mailresult = result;
      var sql2 = 'UPDATE mail SET iread = 1 where id = ?;';
      con.query(sql2, mailid, cbFunc(function (result) {
        debug('log : ' + result);
        con.end();
        cb(false, mailresult);
        return;
      }));
      return;
    }));
  }, 'email');
};

module.exports = mail;




