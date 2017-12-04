var debug = require('debug')('xxx');
var base = require('../base');

function mid_reg(req, res) {
  // console.log(req.body);
  // console.log(req.body.username);
  // console.log(req.body.password);
  //获得 post的数据
  //数据库
  var name = req.body.username;
  var pwd = req.body.password;
  base(function (con) {
    //注册先查询   是否存在该用户名  存在则返回异常
    var sql = 'select * from users where username = \'' + name + '\'';

    con.query(sql, function (err, result) {
      if (err) {
        debug('fail');
        // console.log('注册失败');
        throw err;
      }
      // console.log(result);
      // console.log(result.length);
      if (result.length == 0) {
        //存在该用户名
        base(function (con) {
          var sql = 'INSERT INTO users (username, password) VALUES(\'' + name + '\', \'' + pwd + '\');';
          con.query(sql, function (err, result) {
            if (err) {
              debug('fail');
              // console.log('注册失败');
              throw err;
            }
            debug('注册成功');
            debug(result);
            // console.log();
            // res.send
            //进行跳转登录邮箱
            res.redirect('./login.html');
          });

        }, 'mailsys');
      }
    });
  }, 'mailsys');
}

module.exports = mid_reg;
