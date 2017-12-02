var base = require("./base");
module.exports = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    base(function (con) {
        var sql = "select * from user where username = '" + username + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result.length === 0) {
                console.log("您的帐号或密码有误！");
                res.redirect('/');
            } else {
                result.forEach(function (item) {
                    if (item.password !== password) {
                        console.log("您输入的密码不正确！");
                    } else {
                        res.cookie('username', username).send('The User '+username+' has loggin in');
                        res.redirect('/mail');
                    }
                });
                res.redirect('/regist');
            }
        });
    }, "mydb");
}