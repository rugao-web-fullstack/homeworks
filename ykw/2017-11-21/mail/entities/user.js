const fs = require('fs');
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
    storage.read(function (error, users) {
        if (error) {
            cb(error);
            return;
        }
        // console.log("aaaaaaaaaaa");
        if (users[username]) {
            cb(true);
            return;
        }
        users[username] = {
            // socket: socket,
            user: new User(username, password)
        };
        console.log("aaaaaaaaaaa");
        console.log(users);
        storage.save(users, function (error) {
            if (error) {2
                cb(error);
            }else{
                cb(false);
            }
           
        })
    })
};

User.login = function (socket, username, password, cb) {
    console.log("user manager login");
    storage.read(function (error, users) {
        if (error) {
            cb(error);
            return;
        }
        if (!users[username]) {
            cb(true);
            return;
        }
        let user = users[username].user;
        if (user.password === password) {
            cb(false);
            sockets.push({
                socket: socket,
                username: username
            })
            return;
        } else {
            cb(true);
        }
    })

};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, cb) {
    storage.read(function (error, users) {
        if (error) {
            cb(error);
            return;
        }
        for (var k in users) {
            if (users[k].user.email === address) {
                cb(false)
                return;
            }
            cb(true);
            return;
        }
    })

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
User.getUserBySocket = function (socket, cb) {
    storage.read(function (error, user) {
        if (error) {
            cb(error);
            return;
        }
        for (var k in users) {
            if (users[k].socket === socket) {
                cb(false, users[k].user);
                return;
            }
        }
    })

}

exports.User = User;
// module.exports.User = User;