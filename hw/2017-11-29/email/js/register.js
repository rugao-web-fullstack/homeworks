var base = require('./base');
var debug = require('debug')('xxx');
module.exports = function (req, res) {
    var username = req.body.name;
    debug('log:' + username);
    var pwd = req.body.pwd;
    var name;
    base(function (con) {
        var sql = 'select * from user where user = \'' + name + '\'';
        con.query(sql, function (err, result) {
            if (err) throw err;
            debug('log:' + result);
            if (result.length === 0) {
                base(function (con1) {
                    var sqlIn = 'INSERT INTO user (user, password) values (\'' + name + '\', \'' + pwd + '\' )';
                    con1.query(sqlIn, function (err, results) {
                        var error;
                        debug('log:' + results);
                        if (error) throw error;
                        debug('log:' + '该用户已注册！！');
                    });
                }, 'mydb');
                res.redirect('/');
            } else {
                debug('log:' + '该用户已存在！');
                res.redirect('/register');
            }
        });
    }, 'mydb');
};
function userInsert(req, res, name, pwd) {
    base(function (con) {
        var sql = 'INSERT INTO user (user , password) values (\'' + name + '\', \'' + pwd + '\')';
        con.query(sql, function (err, result) {
            if (err) throw err;
            debug('log:' + 'use registered');
            debug('log:' + result);
            res.redirect('/');
        });
    }, 'mydb');
}
userInsert();