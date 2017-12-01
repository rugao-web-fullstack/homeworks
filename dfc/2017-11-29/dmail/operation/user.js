const db = require('../db/basic')

function User (req,res,next){
    data = req.body;
    if(data.sub === '登录'){
        login(req,res);
    }else if(data.sub === '注册'){
        register(req,res);
    }
}
function login (req,res){
    db(function(con){
        var sql = "SELECT username,password FROM user WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length !== 0){
                console.log(req.body.username+'登录成功');
                req.session.user = req.body.username;
                res.redirect('/main');
            }else{
                console.log('登录失败')
                res.send('账号或密码错误');
            }
        });
    },'dmail');
}
function register (req,res){
    db(function(con){
        var sql = "SELECT username,password FROM user WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length !== 0){
                console.log('注册失败')
                res.send('该账号已存在');
            }else{
                db(function(con){
                    var sql = "INSERT INTO user (username, password) VALUES('" + req.body.username + "','" + req.body.password + "');";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(req.body.username+'录入成功');
                        req.session.user = req.body.username;
                        res.redirect('/main');
                    });
                },'dmail');
            }
        });
    },'dmail');
}
module.exports = User;