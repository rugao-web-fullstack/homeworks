var init = require('../db/db').init;
var debug = require('debug')('log');
var cbFunc = require('./cb').cbMannage;
var user = {};

//检查用户是否重名
user.CheckUser = function (username, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM user where username = ?';
    con.query(sql, username, cbFunc(function (result) {
      if (!result[0]) {
        con.end();
        cb(false);
      } else {
        con.end();
        cb(true);
      }
    }, cb));
  }, 'email');
};

// con.query(sql1, [data], function (next,cb) {
//     return function (err, result) {
//         if (err) {
//             throw err;
//             cb(true);
//         } else {
//             next(result);
//         }
//     }
// }(function(result){},cb))


//替换为
// exports.cb = function (next) {
//     return function (err, result) {
//         if (err) {
//             throw err;
//         } else {
//             next(result);
//         }
//     }
// }

// con.query(sql1, [data],cb(function (result) { }))


//注册
user.Register = function (username, password, mailbox, cb) {
  init(function (con) {
    var sql1 = 'INSERT INTO user (username, password) VALUES ?;';
    var data = [
      [username, password]
    ];
    //将用户名，密码插入到user表格中  
    con.query(sql1, [data], cbFunc(function (result) {
      debug('log : ' + result);
      // console.log('用户名密码插入成功！');
      debug('log : ' + '用户名密码插入成功！');
      //根据用户名查找id
      var sql2 = 'SELECT id FROM user where username = ?';
      con.query(sql2, username, cbFunc(function (result) {
        var userid = result[0].id;
        var sql3 = 'INSERT INTO user_mailbox (mailbox ,user) VALUES ?;';
        var data2 = [
          [mailbox, userid]
        ];
        con.query(sql3, [data2], cbFunc(function (result) {
          debug('log : ' + result);
          // console.log('邮箱用户id插入成功！');
          debug('log : ' + '邮箱用户id插入成功！');
          con.end();
          cb(false);
          return;
        }, cb));
      }, cb));
    }, cb));
  }, 'email');
};


//登录
user.Login = function (username, password, cb) {
  init(function (con) {
    var sql = 'SELECT * FROM user where username = ?';
    con.query(sql, username, cbFunc(function (result) {
      if (!result[0]) {
        debug('log : ' + '没有此用户名！');
        con.end();
        cb(true);
      } else {
        var pas = result[0].password;
        if (password === pas) {
          // console.log('用户名密码正确，登录成功！');
          debug('log : ' + '用户名密码正确，登录成功！');
          con.end();
          cb(false);
        } else {
          // console.log('用户名密码错误，登录失败！');
          debug('log : ' + '用户名密码错误，登录失败！');
          con.end();
          cb(true);
        }
      }
    }));
  }, 'email');
};

module.exports = user;