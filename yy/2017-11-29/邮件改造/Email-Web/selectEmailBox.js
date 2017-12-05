var base = require('./base');
// 根据userId查询user表，返回一条数据
var select = function (userid, cb) {
    base(function (con) {
        var sql = "select * from emailBox  where user='" + userid + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result[0]) {
                console.log('此用户拥有邮箱！');
                console.log(result);
                cb(false, result);
            } else {
                console.log('查用户没有邮箱！');
                cb(true);
            }
        });
    }, 'emaildb');
};

module.exports = select;