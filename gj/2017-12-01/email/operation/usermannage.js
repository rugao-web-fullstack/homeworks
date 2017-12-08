var init = require('../db/db');
var debug = require('debug')('log');
var user = {};

//检查用户是否重名
user.CheckUser = function (username, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM user where username = ?';
    con.query(sql, username, function (err, result) {
      if (err) {
        cb(true);
      } else {
        if (!result[0]) {
          cb(false);
        } else {
          cb(true);
        }
      }
    });
  }, 'email');
};

//注册
user.Register = function (username, password, mailbox, cb) {
  init(function (con) {
    var sql1 = 'INSERT INTO user (username, password) VALUES ?;';
    var data = [
      [username, password]
    ];
    //将用户名，密码插入到user表格中
    con.query(sql1, [data], function (err, result) {
      debug('log : '+result);
      if (err) {
        cb(true);
        return;
      } else {
        // console.log('用户名密码插入成功！');
        debug('log : '+'用户名密码插入成功！');
        //根据用户名查找id
        var sql2 = 'SELECT id FROM user where username = ?';
        con.query(sql2, username, function (err, result) {
          if (err) {
            cb(true);
          } else {
            var userid = result[0].id;
            var sql3 = 'INSERT INTO user_mailbox (mailbox ,user) VALUES ?;';
            var data2 = [
              [mailbox, userid]
            ];
            con.query(sql3, [data2], function (err, result) {
              debug('log : '+result);
              if (err) {
                cb(true);
              } else {
                // console.log('邮箱用户id插入成功！');
                debug('log : '+'邮箱用户id插入成功！');
                cb(false);
                return;
              }
            });
          }
        });
      }
    });
  }, 'email');
};


//登录
user.Login = function (username, password, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM user where username = ?';
    con.query(sql, username, function (err, result) {
      if (err) {
        cb(true);
      } else {
        var pas = result[0].password;
        if (password === pas) {
          // console.log('用户名密码正确，登录成功！');
          debug('log : '+'用户名密码正确，登录成功！');
          cb(false);
        } else {
          // console.log('用户名密码错误，登录失败！');
          debug('log : '+'用户名密码错误，登录失败！');
          cb(true);
        }
      }
    });
  }, 'email');
};

module.exports = user;