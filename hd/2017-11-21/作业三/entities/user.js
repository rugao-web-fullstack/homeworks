let users = {};
const path = require("path");
const fs = require("fs");
const Storage = require("./storage.js").Storage;
const filename = "../data/user.json";
const FILENAME = path.resolve(path.dirname(__filename), filename);

let sockets = {}
let storage = new Storage(FILENAME);

function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

User.register = function (socket,
    username, password) {
    if (users[username]) {
        return false;
    }
    users[username] = {
        socket: socket,
        user: new User(username,
            password)
    };
    return true;
};

User.login = function (socket,
    username, password) {
    console.log("user manager login");
    if (!users[username]) {
        return false;
    }
    users[username].socket=socket;
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


//将用户数组写入文件中
function writeFile(callback) {
    var arr = [];
    var obj = null;
    for (var key in users) {
        obj = {};
        if (users[key].user) {
            obj.username = users[key].user.username;
            obj.password = users[key].user.password;
            arr.push(obj);
        }
    }
    var str = JSON.stringify(arr);

    storage.save(str,function(err){
        if(callback){
            callback(err);
        }
    });
}
//将用户数组从文件中读取出来
function readFile(callback) {
    storage.read((err, data)=> {
        if (data) {
            var arr = JSON.parse(data);
            var username = "";
            var password = "";
            for (var i = 0; i < arr.length; i++) {
                username = arr[i].username
                password = arr[i].password;
                users[username] = {
                    socket:null,
                    user:new User(username, password)
                };
            }
        }
        if (callback) {
            callback(err);
        }
    })
}

exports.User = User;
exports.readFile = readFile;
exports.writeFile = writeFile;
// module.exports.User = User;