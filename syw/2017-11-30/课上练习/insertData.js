var basic = require("./basic");
basic(function (con) {
  var sql = "INSERT INTO user (username, password) VALUES('username11', 'password123');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
  });
}, 'mydb');

