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
                base(function (con1) {
                    var sqlAdd = "INSERT INTO user (username, email, password) VALUES('" + username + "','" + username + "','" + password + "');";
                    con1.query(sqlAdd, function (error, results) {
                        if (error) throw error;
                        console.log("A new user has registed just now!");
                    });
                }, "mydb");
                res.redirect('/');
            } else {
                console.log("此用户名已被占用！");
                res.redirect('/regist');
            }
        });
    }, "mydb");
}