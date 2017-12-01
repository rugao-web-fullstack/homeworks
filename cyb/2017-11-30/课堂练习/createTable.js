var base = require('./connectServer');

base(function(con){
    var sql = "CREATE TABLE user (username VARCHAR(20), password VARCHAR(20))";
    con.query(sql, function(err,res){
        if (err) throw err;
        console.log("Table created!");
    });
},'mydb');