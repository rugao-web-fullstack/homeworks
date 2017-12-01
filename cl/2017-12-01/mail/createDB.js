var base = require("./base");
base(function (con) {
    var sql = "CREATE DATABASE mailsystem";
    con.query(sql, function(err, result){
            if(err) throw err;
            console.log("Database created");
    })
})