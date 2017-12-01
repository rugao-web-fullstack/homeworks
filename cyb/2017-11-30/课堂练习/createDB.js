var base = require('./connectServer');

base(function(con){
    var sql = "CREATE DATABASE mydb";
    con.query(sql, function(err,res){
        if (err) throw err;
        console.log("Database created!");
    });
});