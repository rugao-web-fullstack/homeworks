var base = require('./connectServer');

base(function(con){
    var sql = "INSERT INTO user (username, password) VALUES ('cyb', '123')";
    con.query(sql, function(err,res){
        if (err) throw err;
        console.log("1 record inserted");
        console.log(res);
    });
},'mydb');