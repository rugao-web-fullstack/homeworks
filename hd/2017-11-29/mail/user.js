var DatabaseManage = require("./database.js");

var databaseManage = new DatabaseManage();

function User(username,password){
    this.username = username;
    this.password = password;
}


var userManage = {}


//添加用户
userManage.addUser=function(username,password,callback){
    var user = new User(username,password);
    databaseManage.get("user",{"username":username},function(err,result){
        console.log(result);
        if(result.length){
            callback(new Error("用户已经被注册!"));
            return ;
        }
        databaseManage.add("user",user,function(err,result){
            if(err){
                callback(new Error("用户注册失败!"));
            }else{
                callback(null);
            }
        })
    })
    
}

//判断用户的账号和密码
userManage.checkUser=function(username,password,callback){
    var user = new User(username,password);
    databaseManage.get("user",user,function(err,result){
        if(result.length){
            callback(null);
        }else{
            callback(new Error("用户不存在!"));
        }
    })
}

//判断用户的账号和密码
userManage.isExist=function(username,callback){

    databaseManage.get("user",{"username":username},function(err,result){
        if(result.length){
            callback(null);
        }else{
            callback(new Error("用户不存在!"));
        }
    })
}


module.exports = userManage;