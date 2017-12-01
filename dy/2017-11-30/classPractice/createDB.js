var base = require('./base');
base(function (con) {
    var sql = "CREATE DATABASE mydb";
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log("Database created");
    });
});