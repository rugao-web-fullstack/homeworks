var basic =require("./base");
basic(function(con){
    var username=new Date().getTime();
    var password=new Date().getTime();
    var sql = "insert into user(username,password) values("+username+","+password+")";
    con.query(sql,function(err, result){
        if(err) throw err;
        console.log("Data inserted");
        console.log(result);
    });
},"mydb");