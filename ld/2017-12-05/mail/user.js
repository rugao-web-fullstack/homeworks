var usr = require('./databaseCon');
client = usr.connect();
function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

var userManager = {};

userManager.addUser = function (client, username, password, callback) {
    var user = new User(username, password);
    usr.selectUser(client, user.username, function (err, result) {
        if (result.length) {
            callback(new Error('用户已经被注册!'));
            return;
        } 
        usr.insertUser(client, username, password,function(err){
            if(err){
                callback(new Error('用户注册失败!'));
            }else{
                callback(null);
            }
        });
        
    });
};

userManager.checkUser = function (client, username, callback) {
    var user = new User(username, password);
    usr.selectUser(client, user.username, function (err, result) {
        if (result.length) {
            callback(null);
        } else{
            callback(new Error('用户不存在!'));
        }
    });
};

userManager.isUser = function (client, username, callback) {
    var user = new User(username, password);
    usr.selectUser(client, user.username,user.password, function (err, result) {
        if (result.length) {
            callback(null);
        } else{
            callback(new Error('用户不存在!'));
        }
    });
};

module.exports = userManager;