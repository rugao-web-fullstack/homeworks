function User(username, password) {
    this.username = username;
    this.password = password;
    //--表示是否在线信息
    this.online = false;
    //--存储邮件
    this.mail = [];
    //--该socket
    this.socket = null;
}

//---给用户类添加一个在线响应事件
User.prototype.onlineReceive = function (msg) {
    this.socket.write(msg + '\n');
};
//---给用户一个将消息保存至emial的方法
User.prototype.GetMail = function (email) {
    this.mail.push(email);
}
//---用户列表
let UserArr = [];
//---用户列表添加
UserArr.add = function (username, password) {
    var newuser = new User(username, password);
    UserArr.push(newuser);
    console.log(UserArr);
}
//---用户登录检查
UserArr.login = function (username, password, socket) {
    //定义flag
    var flag = 0;
    for (let i = 0; i < UserArr.length; i++) {
        if (UserArr[i]['username'] === username && UserArr[i]['password'] === password) {
            flag = 1;
            //此时将online设置为true
            UserArr[i]['online'] = true;
            //此时将socket设置为现在的socket
            UserArr[i]['socket'] = socket;
        }
    }
    return flag;
}
module.exports = UserArr;