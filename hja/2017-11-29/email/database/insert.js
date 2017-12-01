var db = require('./db');
function insert(username, password, cb) {
    db(function (con) {

        var sql = "INSERT INTO user (username, password) VALUES ?;";
        var data = [
            [username, password]
        ];
        con.query(sql, [data], function (err, result) {
            if (err) {
                cb(true);
                return;
            } else {
                console.log('插入成功');
                cb(false);
                return;
            }
        })
    }, 'email');

}

module.exports = insert;



