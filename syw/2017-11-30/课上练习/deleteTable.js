var basic = require("./basic");
basic(function (con) {
  var sql = "DROP TABLE aaa;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}, 'mydb');

