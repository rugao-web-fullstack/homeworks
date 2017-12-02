var basic = require("./basic");
basic(function (con) {
  var sql = "SELECT * FROM user ORDER BY username";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}, 'mydb');

