var basic = require("./basic");
basic(function (con) {
  var sql = "select * from user;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}, 'mydb');

