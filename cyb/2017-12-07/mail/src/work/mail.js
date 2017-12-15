const db = require('../db/basic');
const async = require('async');
var debug = require('debug')('mail');
var cb = require('./cb').cb;

function Mail(req, res) {
  this.user = req.session.user;
  this.req = req;
  this.res = res;
  debug('log:' + 'mail初始化');
}

Mail.prototype.sendMail = function() {
  var self = this;
  let data = this.req.body;
  db(function(con) {
    let mailid = 0;
    var sql = 'SELECT id FROM mailbox WHERE address = \'' + data.address + '\';';
    con.query(sql, cb(function(result) {
      debug('log:' + '查询到地址');
      var mailboxid = result[0].id;
      debug('log:' + self.user);
      sql = 'INSERT INTO mail (sender, receiver, title, content, date) VALUES(\'' + self.user + '\',\'' + data.address + '\',\'' + data.title + '\',\'' + data.content + '\',\'' + data.date + '\');';
      con.query(sql, cb(function() {
        debug('log:' + '添加邮件列表');
        sql = 'SELECT id FROM mail WHERE title = \'' + data.title + '\'AND date = \'' + data.date + '\';';
        con.query(sql, cb(function(result) {
          debug('log:' + '查询到邮件id');
          mailid = result[0].id;
          sql = 'INSERT INTO receivered_mail (mail, mailbox) VALUES(\'' + mailid + '\',\'' + mailboxid + '\');';
          con.query(sql, cb(function() {
            debug('log:' + '添加收件箱列表');
            self.res.send('success');
            con.end();
          }));
        }));
      }));
    }));
  }, 'mail');
};

Mail.prototype.readMailList = function() {
  var arr = [];
  var self = this;
  db(function(con) {
    var sql = 'SELECT id FROM user WHERE username = \'' + self.user + '\';';
    con.query(sql, cb(function(result) {
      debug('log:' + result[0]);
      var sql = 'SELECT mailbox FROM user_mailbox WHERE user = \'' + result[0].id + '\';';
      con.query(sql, cb(function(result) {
        debug('log:' + result[0]);
        var sql = 'SELECT mail FROM receivered_mail WHERE mailbox = \'' + result[0].mailbox + '\';';
        con.query(sql, cb(function(result) {
          debug('log:' + result.length);
          async.each(result, function(mailmsg, callback) {
            debug('log:' + mailmsg);
            var sql = 'SELECT * FROM mail WHERE id = \'' + mailmsg.mail + '\';';
            con.query(sql, cb(function(result) {
              debug('log:' + result[0]);
              arr.push(result[0]);
              callback();
            }));
          }, cb(function () {
            debug('log:' + '读取全部邮件');
            self.res.send(arr);
            con.end();
          }));
        }));
      }));
    }));
  }, 'mail');
};

Mail.prototype.readMailContent = function() {
  var self = this;
  let data = this.req.body;
  db(function(con) {
    var sql = 'update mail set state=1 where id=\'' + data.id + '\';';
    con.query(sql, cb(function (result) {
      debug('log:' + result);
      self.res.send('文件已读');
      con.end();
    }));
  }, 'mail');
};

module.exports = Mail;