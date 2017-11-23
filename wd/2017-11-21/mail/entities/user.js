const Storage = require('./storage').Storage;
const filename = '../data/user.json';
const path = require("path");
const storage = new Storage(path.resolve(path.dirname(__filename), filename));


let users = {

};

let sockets = [];

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket, username, password, cb) {
    console.log('现在在注册函数\n');
    storage.read(function (error, UsersInfo) {
        if (error) {
            cb(error);
            return;
        }
        if (UsersInfo[username]) {
            console.log('已经存在');
            cb(true);
            return;
        }
        UsersInfo[username] = {
            // socket:socket,
            user: new User(username, password)
        };
        storage.save(UsersInfo, function (error) {
            if (error) {
                cb(error);
            }
            cb(false);
        });
    });
    // if (users[username]) {
    //     return false;
    // }
    // users[username] = {
    //     socket: socket,
    //     user: new User(username,
    //         password)
    // };
    // return true;
};

User.login = function (socket, username, password, cb) {
    console.log("user manager login");
    // if (!users[username]) {
    //     return false;
    // }
    // let user = users[username].user;
    // return user.password === password;
    storage.read(function (error, UsersInfo) {
        if (error) {
            cb(error);
            return;
        }
        if (UsersInfo[username]) {
            console.log('存在');
            if (UsersInfo[username].user.username === username && UsersInfo[username].user.password === password) {
                cb(false);
                //---此时往sockets里加东西
                sockets.push({
                    socket: socket,
                    nowUser: username
                });
                console.log(sockets);
                return;
            }
            else {
                cb(true);
            }
        }

    })
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, cb) {
    console.log('isAdress\n');
    storage.read(function (error, UserInfo) {
        if (error) {
            cb(error);
            return;
        }
        for (var k in UserInfo) {
            if (!UserInfo[address]) {
                cb(true);
                return;
            } else {
                console.log('cunzai');
                cb(false);
                return;
            }
        }
    });
    // for (var k in users) {
    //     if (users[k].user.email === address) {
    //         return true;
    //     }
    // }
    // return false;
}

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
    for (var k in sockets) {
        if (sockets[k].nowUser === address) {
            return sockets[k].socket;
        }
    }
    return null;
    // for (var k in users) {
    //     if (users[k].user.email === address) {
    //         return users[k].socket
    //     }
    // }
    // return null;
};


/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket, cb) {
    storage.read(function (error, UserInfo) {
        if (error) {
            cb(error);
            return;
        }
        for (var i in sockets) {
            if (sockets[i].socket === socket) {
                for (var k in UserInfo) {
                    if (UserInfo[k].user.username === sockets[i].nowUser) {
                        cb(false, UserInfo[k].user);
                        return;
                    }
                }
            }
        }
        cb(false, null);
        return;
    })
    //根据socket获取username
    // for(var i in sockets){
    //     if(sockets[i].socket===socket){
    //         //---读取
    //         storage.read(function (error,UserInfo) {
    //             if(error){
    //                 cb(error);
    //                 return;
    //             }
    //             for(var k in UserInfo){
    //                 if(UserInfo[k].user.username===sockets[i].nowUser){
    //                     //---此时执行回调
    //                     cb(false,UserInfo[k].user);
    //                     return;
    //                 }
    //             }
    //         })
    //     }
    // }
    // cb(false,null);
    // return;
    // for (var k in users) {
    //     if (users[k].socket === socket) {
    //         return users[k].user
    //     }
    // }
    // return null;
}

exports.User = User;
// module.exports.User = User;