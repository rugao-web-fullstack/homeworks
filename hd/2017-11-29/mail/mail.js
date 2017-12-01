var DatabaseManage = require("./database.js");

var databaseManage = new DatabaseManage();

function Mail(sender,receiver,title,content){
    this.sender = sender;
    this.receiver = receiver;
    this.title = title;
    this.content = content;
    this.date = (new Date()).toLocaleString();
}

var MailManage = {};

MailManage.addMail = function(sender,receiver,title,content,callback){
    var mail = new Mail(sender,receiver,title,content);
    databaseManage.add("mail",mail,function(err,result){
        console.log(err);
        if(err){
            callback(new Error("邮件发送失败!"));
        }else{
            callback(null);
        }
    })
}

MailManage.getMail = function(receiver,callback){
    databaseManage.get("mail",{"receiver":receiver},function(err,result){
        if(result.length){
            callback(null,result);
        }else{
            callback(new Error("邮件不存在!"));
        }
    })
}

module.exports = MailManage;