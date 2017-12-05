var debug = require('debug')('log');

let states = require('../states').states;
const path = require('path');
const UserManager = require('./user').User;

debug('log' + states);
debug('log' + UserManager);
// 创建Storage，也就是加载或者保存的对象
const FILENAME = '../data/user.json';

const Storage = require('./storage').Storage;
const storage = new Storage(
  //把FILENAME路径解析添加到path.dirname(__filename)路径下 Demo/data/mail.json
  //path.dirname(__filename)：返回这个js文件的上一级
  path.resolve(
    path.dirname(__filename), FILENAME));
//

let userSocke = [];

function User(username, password) {
  this.username = username;
  this.email = username;
  this.password = password;
}


//注册
User.register = function (socket, username, password, cb) {
  storage.read((error, users) => {
    if (error) {
      cb(error);
      return;
    }

    if (!users) {
      users = {};
    }

    //用户已经存在，返回false
    if (users[username]) {
      cb(true);
      return;
    }

    //用户不存在注册成功
    users[username] = new User(username, password);

    storage.save(users, (error) => {
      if (error) {
        cb(error);
        return;
      }
      cb(false);
    });
  });
};


//登陆
User.login = function (socket,
  username, password, cb) {
  // console.log('user manager login');
  debug('log : ' + 'user manager login');
  //判断有没有这个用户
  storage.read((error, users) => {
    if (error) {
      cb(error);
      return;
    }
    if (!users[username]) {
      cb(true);
      return;
    }
    if (users[username].password === password) {
      userSocke.push({
        socket: socket,
        username: username
      });
      cb(false);
    }
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
    if (users[address]) {
      cb(false);
      return;
    }
    cb(true);
  });
};

/**
 * 根据地址获取用户socket
 * 根据你填写的用户名获取对方的socket
 * @param {*} address 
 */
User.getSocket = function (address) {
  for (var k in userSocke) {
    if (userSocke[k].username === address) {
      return userSocke[k].socket;
    }
  }
  return null;
};


/**
 * 根据socket获取用户
 * 根据发送者的socket获取这个发送者用户名
 * @param {*} address 
 */
User.getUserBySocket = function (socket, cb) {
  for (var k in userSocke) {
    if (userSocke[k].socket === socket) {
      var nowname = userSocke[k].username;
    }
  }
  // console.log(nowname);
  debug('log : ' + nowname);
  storage.read((error, users) => {
    if (error) {
      cb(error);
      return;
    }
    if (users[nowname]) {
      cb(false, users[nowname]);
      return;
    }
    cb(true);
  });
};

exports.User = User;
// module.exports.User = User;