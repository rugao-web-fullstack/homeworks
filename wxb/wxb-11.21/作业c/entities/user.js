var debug = require('debug')('user');


let users = {};
let sockets = [];
const fs = require('fs');
const path = require('path');
// const UserManager = require('./user').User;
const Storage = require('./storage').Storage;
const FILENAME = '../data/user.json';
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));


function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket, username, password, cb) {
    users[username] = {
        user: new User(username,
            password)
    };
    storage.save(users, (error) => {
        if (error) {
            cb(error);
        } else if (username.indexOf('@') == -1) {
            socket.write('邮箱名应该包含\'＠\'!!!\n');
            cb(true);
        } else {
            cb(false);
        }
    });
    // return true;
};

User.login = function (socket, username, password, cb) {
    debug('user manager login');

    storage.read((error, users) => {
        if (error) {
            cb(error);
            return;
        }
        if (users[username]) {
            if (users[username].user.username == username && users[username].user.password == password) {
                cb(false);
                //---临时存储socket
                sockets.push({
                    socket: socket,
                    nowUser: username
                });
                debug(sockets);
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
    storage.read(function (error, users) {
        if (error) {
            cb(error);
            return;
        }
        for (var k in users) {
            if (!users[address]) {
                cb(true);
                return;
            } else {
                cb(false);
                return;
            }
        }
    });

};

/**
 * 根据地址获取用户socket
 * @param {*} address
 */
User.getSocket = function (address) {
    for (var k in sockets) {
        if (sockets[k].nowUser == address) {
            return sockets[k].socket;
        }
    }
    return null;

};


/**
 * 根据socket获取用户
 * @param {*} address
 */
User.getUserBySocket = function (socket, cb) {
    storage.read(function (error, users) {
        if (error) {
            cb(error);
            return;
        }
        for (var i in sockets) {
            if (sockets[i].socket == socket) {
                for (var k in users) {
                    if (users[k].user.username == sockets[i].nowUser) {
                        cb(false, users[k].user);
                        return;
                    }
                }
            }
        }
        cb(false, null);
        return;
    });

};

exports.User = User;
// exports.write = write;
// exports.read = read;
// module.exports.User = User;