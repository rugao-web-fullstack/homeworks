const path = require('path');
var debug = require('debug');

const Storage = require('./storage.js').Storage;
const filename = '../data/user.json';
const FILENAME = path.resolve(path.dirname(__filename), filename);

let sockets = {};
let storage = new Storage(FILENAME);

function User(username, password) {
  this.username = username;
  this.email = username;
  this.password = password;
}

User.register = function (socket, username, password, callback) {
  storage.read(function (err, users) {
    if (err) {
      callback(err);
      return;
    }
    if (!users) {
      users = {};
    }
    if (users[username]) {
      callback(new Error('用户已经被注册'));
      return;
    }
    users[username] = new User(username, password);

    storage.save(users, (error) => {
      callback(error);
    });
  });
};

User.login = function (socket, username, password, callback) {

  storage.read(function (error, users) {

    if (error) {
      callback(error);
      return;
    }
    if (!users[username]) {
      callback(new Error('用户不存在'));
      return;
    }
    let user = users[username];
    if (user.password === password) {

      sockets[username] = socket;
      callback(null);

      return;
    } else {
      callback(new Error('账号密码输入错误'));
    }
  });
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, callback) {
  storage.read((error, users) => {
    for (var k in users) {
      if (users[k].email === address) {
        callback(null);
        return;
      }
    }
    callback(new Error());
  });
};

/**
 * 根据地址获取用户socket
 * @param {*} address 
 */
User.getSocket = function (address) {
  debug(sockets);
  for (var k in sockets) {
    if (k === address) {
      return sockets[k];
    }
  }
};

/**
 * 根据socket获取用户
 * @param {*} address 
 */
User.getUserBySocket = function (socket, callback) {

  storage.read((error, users) => {
    for (var k in sockets) {
      if (sockets[k] === socket) {
        debug(users[k]);
        callback(null, users[k]);
        return;
      }
    }
    callback(new Error('没有找到用户'));
  });

};

exports.User = User;