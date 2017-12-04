var base = require('./base');
var debug = require('debug')('xxx');
module.exports = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    base(function (con) {
        var sql = 'select * from user where username = \'' + username + '\'';
        con.query(sql, function (err, result) {
            if (err) throw err;
            debug(result);
            if (result.length === 0) {
                base(function (con1) {
                    var sqlAdd = 'INSERT INTO user (username, email, password) VALUES(\'' + username + '\',\'' + username + '\',\'' + password + '\');';
                    con1.query(sqlAdd, function (error, results) {
                        if (error) throw error;
                        debug('A new user has registed just now!');
                        debug(results);
                    });
                }, 'mydb');
                res.redirect('/');
            } else {
                debug('此用户名已被占用！');
                res.redirect('/regist');
            }
        });
    }, 'mydb');
};
