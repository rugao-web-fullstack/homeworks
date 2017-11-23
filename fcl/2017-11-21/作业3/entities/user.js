let states = require("../states").states;
const path = require("path");
const UserManager = require('./user').User;
// 创建Storage，也就是加载或者保存的对象
const FILENAME = "../data/user.json";
const Storage = require("./storage").Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));
function User(username, password) {
    this.username = username;
    this.email = username;
    this.password = password;
}

let sockets=[];
let users = {};

User.register = function (socket,username, password,cb) {
    storage.read((error, users) => {
        if (error) {
            console.log(error.stack);
            cb(error);
            return;
        }
        users[username] = {
           user: new User(username,password)
         };
      //  users[username].push(user);
        storage.save(users, (error) => {
            if (error) {
                cb(error);
               
            }
            cb(false);
        })
    });
};

User.login = function (socket,username, password , cb) {
    storage.read((error, users) => {
        if (error) {
            cb(error);
            return;
        }
      
        if(password===users[username].user.password){
            sockets.push({socket:socket,username:username});
            return cb(false, users);
        }
        //进行用户名和密码匹配的判断
    });
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, cb) {
    storage.read((error, users) => {
        if (error) {
            cb(error);
            return;
        }
        for (var k in users) {
            if (!users[address]) {
                cb(true);
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
User.getSocket = function (address,users) {
    storage.read((error, users) => {
        if (error) {
            cb(error);
            return;
        }
        for (var k in users) {
            if (users[k].user === address) {
                cb(false,users);
            }
        }
    });
}

/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket,cb) {
    storage.read((error,users) => {
       
        console.log(typeof error)
        console.log(users);
        if (error) {
          console.log("xxxxxxxxxxxxxxx")    
            return;
        }
        for (var i in sockets) {
            if (sockets[i].socket === socket) {
                for (var k in users) {
console.log("woyaode username"+ users[k].user.username)
console.log("woyao de socket"+ sockets[i].username)
                   if (users[k].user.username === sockets[i].username) {
console.log("user found!");
                       cb(false, user[k].user);
                       break;
                   }
                }
            }
        }
        cb(false,null);
        return;
    })
}

exports.User = User;
