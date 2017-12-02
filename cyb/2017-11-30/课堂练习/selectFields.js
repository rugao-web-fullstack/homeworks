var base = require('./connectServer');

base(function (con) {
    var sql = "select username from user;";
    con.query(sql, function(err,res){
        if (err) throw err;
        console.log(res);
        res.forEach(function(item) {
            console.log(item.username);
        });
    });
}, 'mydb');