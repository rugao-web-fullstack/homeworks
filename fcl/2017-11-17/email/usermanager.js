let users = {
};

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket,
    username, password) {
    // 如果用户名存在了，返回false
    if (users[username]) {
        return false;
    }
    // 如果不存在的话，返回true并且添加
    users[username] = {
        socket: socket,
        user: new User(username,
            password)
    };
    return true;
};

User.login = function (socket,
    username, password) {
    // 如果没有这个用户名，返回false
    if (!users[username]) {
        return false;
    }
    // else得到users里面的对应的一对键值对，并返回该密码
    let user = users[username].user;
    return user.password === password;
};

//判断当前地址是不是有用户拥有
User.isAddress = function (address) {
    for (var k in users){
       if (users[k].user.email === address){
            return users[k].socket;
       }
    }
    return null;
};
//根据地址（注册时候的用户名）来获取该用户名的socket
User.getSocket = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return users[k].socket
        }
    }
    return null;
}

// 反过来根据socket来获得用户
User.getUserBySocket = function (socket) {
    for (var k in users){
       if (users[k].socket === socket){
            return users[k].user;
       }
    }
    return null;
};

exports.User = User;

