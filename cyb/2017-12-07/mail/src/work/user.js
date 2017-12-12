const db = require('../db/basic');
var debug = require('debug')('mail');
var cb = require('./cb').cb;

function User(req, res) {
  var data = req.body;
  debug('log:' + req.body);
  if(data.sub === '登录') {
    login(req, res);
  } else {
    register(req, res);
  }
}

function login(req, res) {
  db(function(con) {
    var sql = 'SELECT username,password FROM user WHERE username = \'' + req.body.username + '\' AND password = \'' + req.body.password + '\';';
    con.query(sql, cb(function(result) {
      if(result.length !== 0) {
        debug('log:' + req.body.username + '登录成功');
        req.session.user = req.body.username;
        res.send('/main');
        con.end();
      } else {
        debug('log:' + '登录失败');
        res.send('password_wrong');
        con.end();
      }
    }));
  }, 'mail');
}

function register(req, res) {
  var data = req.body;
  db(function(con) {
    debug('log:' + con + '===================');
    var sql = 'SELECT username,password FROM user WHERE username = \'' + data.username + '\' AND password = \'' + data.password + '\';';
    // var sql = 'select * from user;';
    con.query(sql, cb(function(result) {
      debug('log:' + result + '---------------');
      if(result.length !== 0) {
        debug('log:' + '注册失败');
        res.send('username_existed');
        con.end();
      } else {
        var userid = 0;
        var mailboxid = 0;
        sql = 'INSERT INTO user (username, password) VALUES(\'' + data.username + '\',\'' + data.password + '\');';
        con.query(sql, cb(function() {
          debug('log:' + req.body.username + '添加成功');
          sql = 'SELECT id FROM user WHERE username = \'' + data.username + '\' AND password = \'' + data.password + '\';';
          con.query(sql, cb(function(result) {
            userid = result[0].id;
            sql = 'INSERT INTO mailbox (address) VALUES(\'' + data.username + '@mail.com\');';
            con.query(sql, cb(function() {
              debug('log:' + data.username + '添加地址成功');
              sql = 'SELECT id FROM mailbox WHERE address = \'' + data.username + '@mail.com\';';
              con.query(sql, cb(function (result) {
                mailboxid = result[0].id;
                sql = 'INSERT INTO user_mailbox (user, mailbox) VALUES(\'' + userid + '\',\'' + mailboxid + '\');';
                con.query(sql, cb(function() {
                  debug('log:' + data.username + '关系表添加成功');
                  req.session.user = data.username;
                  res.send('/main');
                  con.end();
                }));
              }));
            }));
          }));
        }));
      }
    }));
  }, 'mail');
}
module.exports = User;