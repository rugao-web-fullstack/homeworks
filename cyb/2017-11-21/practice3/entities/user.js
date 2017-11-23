const path = require("path");
const fs = require("fs");
const Storage = require("./storage").Storage;
const FILENAME = "../data/user.json";
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

let users = {

};
let sockets = [];

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket, username, password, cb) {
    sockets[username] = socket;
    storage.read(function (error, users) {
        if (error) {
            console.log(err.stack);
            cb(error);
            return;
        }
        if (users[username]) {
            cb(true);
            return;
        }
        users[username] = {
            user: new User(username, password)
        };
        storage.save(users, function (error) {
            if (error) {
                console.log(err.stack);
                cb(error);

            }
            cb(false);
        });
    });
};

User.login = function (socket, username, password, cb) {
    console.log("user manager login");
    storage.read(function (error, users) {
        if (error) {
            console.log(error);
            cb(error);
            return;
        }
        if (users[username]) {
            console.log('存在');
            if (users[username].user.username === username && users[username].user.password === password) {
                cb(false);
                for (let i = 0; i < sockets.length; i++) {
                    if (sockets[i].nowUser === username) {
                        sockets[i].socket = socket;
                    }
                }
                sockets.push({
                    socket: socket,
                    nowUser: username
                });
                console.log(sockets);
                return;
            } else {
                cb(true);
            }
        }
    });
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, cb) {
    console.log('isAddress\n');
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
                cb(false);
                return;
            }
        }
    });
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
}


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
    });
}
exports.User = User;