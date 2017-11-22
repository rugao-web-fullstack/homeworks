const FILENAME = "../data/user.json";
const path = require("path");
const Storage = require("./storage").Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));


let users = {
};
let sockets = {

}
function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket,username, password, cb) {
    sockets[username] = socket;
    storage.read((error, users) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }
        if (users[username]) {
            //return false;
            cb(error);
        }
        if (!users[username]) {
            users[username] = [];
            users[username].push({
                username:username,
                password:password
            });
        }
        storage.save(users, (error) => {
            ///console.log("save");
            if (error) {
                cb(error);
                return;
            }
            cb(false);
        })

    });
    //return true;
};

User.login = function (socket, username, password) {

    console.log("user manager login");
    if (!users[username]) {
        return false;
    }
    let user = users[username].user;
    return user.password === password;
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return true;
        }
    }
    return false;
}

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
    for (var k in users) {
        if (users[k].user.email === address) {
            return users[k].socket
        }
    }
    return null;
}


/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket) {
    for (var k in users) {
        if (users[k].socket === socket) {
            return users[k].user
        }
    }
    return null;
}

exports.User = User;
// module.exports.User = User;
