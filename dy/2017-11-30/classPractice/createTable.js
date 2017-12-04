var basic = require('./base');
basic(function (con) {
    var sql = "CREATE Table user (username VARCHAR(20), password VARCHAR(64))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
}, 'mydb');