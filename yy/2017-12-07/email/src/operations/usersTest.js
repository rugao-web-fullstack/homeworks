var base = require('../emaildb/base').init;

function User(){}

User.prototype.register=function(req,res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  // 先查询user表中的该用户名是否被占用
  base(function (con) {
    var sql = 'select * from user  where username=\'' + username + '\';';
    con.query(sql, function (err, result) {
      // if (err) throw err;
      if (result[0]) {
        req.session.register=0;
        res.redirect('/user/register/failure');
      } else {
        //当用户名不存在，才执行插入user
        base(function (con) {
          var sql = 'INSERT INTO user (username,password) VALUES(\'' + username + '\',\'' + password + '\');';
          con.query(sql, function (err, result) {
            //  if (err) throw err;
            // 将该用户的id 与email一起插入进email表中
            var userId=result.insertId;
            base(function (con) {
              var sql = 'INSERT INTO emailbox (user,address) VALUES(\'' + userId + '\',\'' + email + '\');';
              con.query(sql, function (err) {
                if (err) throw err;
                req.session.register=1;
                res.redirect('/user/register/success');
              });
            }, 'emaildb');
          });
        }, 'emaildb');
      }
    });
  }, 'emaildb');
};

User.prototype.login=function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  base(function (con) {
    var sql = 'select * from user  where username=\'' + username + '\';';
    con.query(sql, function (err, result) {
      // if (err) throw err;
      if (result[0]) {
        var pwd = result[0].password;
        var userId = result[0].id;
        if(pwd===password){
          req.session.user = result[0].username;
          req.session.login=1;

          //根据userId获取该用户的email地址
          base(function (con) {
            var sql = 'select * from emailbox  where user=\'' + userId + '\';';
            con.query(sql, function (err, result) {
              //     if (err) throw err;
              req.session.sender=result[0].address;
              res.redirect('/user/login/success');
            });
          }, 'emaildb');
        }else{
          req.session.login=0;
          res.redirect('/user/login/failure');
        }
      } else {
        //该用户不存在
        req.session.login=0;
        res.redirect('/user/login/failure');
      }
    });
  }, 'emaildb');
};
exports.User=User;
