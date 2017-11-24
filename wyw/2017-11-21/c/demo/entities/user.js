let states = require("../states").states;
const path = require("path");

const FILENAME = "../data/user.json";


const Storage = require("./storage").Storage;
const storage = new Storage(
    path.resolve(
        path.dirname(__filename), FILENAME));

let users = {

};

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket,
    username, password, cb) {
    storage.read((error, users) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }

        if (!users[username]) {
            users[username] = [];
        } else {
            socket.write('\n用户已经存在！\n');
            cb(true);
            return;
        }
       
        let user = new User(
            username, password);

        users[username].push({
            read: false,
            user: user
        });

        storage.save(users, (error) => {
            if (error) {
                cb(error);
                return;
            }
            cb(false);
        })
    });
    return true;
};
let Sockets = {
};
Sockets = [];
User.login = function (socket,
    username, password, cb) {
    console.log("user manager login");
    Sockets.push({
        user: username,
        socket: socket
    });
    console.log(Sockets.length);
    if (!users[username]) {
        cb(false);
    } else {
        let user = users[username].user;
        if (user.password === password) {
            cb(true);
        }
    }

};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, cb) {
    storage.read((error, str) => {
        if (error) {
            cb(error);
            return;
        }
        for (var k in str) {
            if (str[k][0].user.email === address) {
                cb(false);
                return;
            }
        }
        cb(true);
    })

}

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
    for (var k in Sockets) {
        if (Sockets[k].user === address) {
            return Sockets[k].socket;
        }
    }
    return null;
}


/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket) {
    for (var k in Sockets) {
        if (Sockets[k].socket === socket) {
            return Sockets[k].user;
        }
    }
    return null;
}

exports.User = User;