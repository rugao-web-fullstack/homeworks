const FILENAME = "../data/user.json";
const path = require("path");
const Storage = require("./storage").Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

let users = {
};
let sockets = {

};
function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket, username, password, cb) {

    storage.read((error, users) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }
        if (users[username]) {
            // console.log("111");
            cb(true);
        }
        if (!users[username]) {
            users[username] = [];
            users[username].push({
                username: username,
                password: password
            });
            cb(false);
        }
        storage.save(users, (error) => {
            if (error) {
                cb(error);
                return;
            }
        });

    });
};

User.login = function (socket, username, password, cb) {
    storage.read((error, userJson) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }
        if (!userJson[username]) {
            cb(true);
        }
        else if (userJson[username]) {
            let user = userJson[username][0];
            if (user.password === password) {
                sockets[username] = [];
                sockets[username].push({
                    username: username,
                    socket: socket
                });
                cb(false);
            } else {
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
    // var data = fs.readFile(path.resolve(path.dirname(__filename), FILENAME), function (err, data) {
    //     if (err)
    //         console.log('读取文件时发生错误！');
    //     else {
    //         let userJson = JSON.parse(data.toString());
    // for (var k in userJson) {
    //     if (k === address) {
    //         if (userJson[k].username === address) {
    //             cb(false);
    //             return;
    //         }
    //         // console.log(userJson[k]);
    //     }
    // }
    // cb(true);
    //     }
    // });
    storage.read((error, userJson) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }
        else {
            for (var k in userJson) {
                if (k === address) {
                    if (userJson[k].username === address) {
                        cb(false);
                        return;
                    }
                    // console.log(userJson[k]);
                }
            }
            cb(true);
        }
    });
}

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
    for (var k in sockets) {
        console.log(k);
        // console.log("111");
        console.log("address=" + address);
        console.log(sockets[k][0]);
        console.log(sockets[k][0].username);
        if (sockets[k][0].username === address) {
            console.log("111");
            return sockets[k][0].socket;
        }
    }
    return null;
}


/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket) {
    for (var k in sockets) {
        console.log("111");
        if (sockets[k][0].socket === socket) {
            return sockets[k][0].username;
        }
    }
    return null;
}

exports.User = User;
// module.exports.User = User;
