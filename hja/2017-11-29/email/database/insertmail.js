var db = require('./db');
function insert(receiver, sender, title, content, cb) {
    db(function (con) {
        var sql = "INSERT INTO mail (receiver, sender, title, content) VALUES ?;";
        var data = [
            [receiver, sender, title, content]
        ];
        con.query(sql, [data], function (err, result) {
            if (err) {
                cb(true);
                return;
            }
            cb(false);
            return;

        });

    }, 'email');

}

module.exports = insert;