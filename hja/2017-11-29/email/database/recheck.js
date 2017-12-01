var db = require('./db');
function recheck(username, cb){
    console.log('进来2');
    db(function(con){
        var sql = "select * from user where username = ?";
        con.query(sql, username, function(err, result){
            console.log(result[0]);
            if(result[0]){
                cb(true);
                return;
            }
            cb(false);
        });
    
    
    
    },'email');

}
module.exports = recheck;