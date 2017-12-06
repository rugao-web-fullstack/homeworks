var base = require('./base');
// 根据用户名查询user表，返回一条数据
var select = function (username, cb) {
    base(function (con) {
        var sql = "select * from user  where username='" + username + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result[0]) {
                console.log('此用户存在！');
                console.log(result);
                cb(false, result);
            } else {
                console.log('查无此用户！');
                cb(true);
            }
        });
    }, 'emaildb');
}

module.exports = select;