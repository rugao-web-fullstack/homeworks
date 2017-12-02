const path = require("path");
const UserManager = require('./user').User;
const Storage = require("./storage").Storage;
const FILENAME = "../data/user.json";
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

let users = {};
let sockets = [];

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function(socket, username, password, cb) {

    sockets.push({
        socket: socket,
        username: username
    });
    console.log(sockets);
    storage.read((err, users) => {
        if (err) {
            console.log(err.stack);
            cb(err);
            return;
        }
        if (users[username]) {
            cb(err);
        }
        if (!users[username]) {
            //users[username] = [];
            users[username] = {
                email: username,
                username: username,
                password: password
            };
        }
        storage.save(users, (err) => {
            if (err) {
                console.log(err.stack);
                cb(err);
                return;
            }
            cb(false);
        });

    });
};

User.login = function(socket, username, password, cb) {

    console.log("user manager login");

    storage.read((err, users) => {
        if (err) {
            console.log(err);
            cb(err);
            return;
        }
        let user = users[username].username;
        return user === cb(false, users[username]);
    });
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function(address, cb) {
        storage.read((err, users) => {
            if (err) {
                console.log(err);
                cb(err);
                return;
            }
            for (var k in users) {
                if (users[k].email === address) {
                    return cb(false);
                }
            }
            return cb(true);
        });
    }
    /**
     * 根据地址获取用户socket
     * @param {*} address 
     */
User.getSocket = function(address) {
    for (var j in sockets) {
        if (sockets[j].username === address) {
            return sockets[j].socket;
        }
    }
    return null;
}

/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getemailbySocket = function(socket, cb) {
    storage.read((err, users) => {
        if (err) {
            console.log(err);
            cb(err);
            return;
        }
        for (i in sockets) {
            if (sockets[i].socket === socket) {
                let id = i;
                for (key in users) {
                    if (users[key].username === sockets[id].username) {
                        cb(false, users[key].email);
                    }
                }
                return true;
            }
        }
    });
};

exports.User = User;