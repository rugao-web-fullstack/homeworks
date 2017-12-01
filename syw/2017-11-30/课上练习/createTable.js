var basic = require("./basic");
basic(function (con) {
  var sql = "CREATE TABLE user (username VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}, 'mydb');

