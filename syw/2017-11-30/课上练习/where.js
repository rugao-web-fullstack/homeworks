var basic = require("./basic");
basic(function (con) {
  var sql = "SELECT * FROM user WHERE password = 'Park Lane 38'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}, 'mydb');

