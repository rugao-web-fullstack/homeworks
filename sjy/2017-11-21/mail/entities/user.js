var debug = require('debug')('xxx');
const Storage = require('./storage').Storage;
const filename = '../data/user.json';
const path = require('path');
const storage = new Storage(path.resolve(path.dirname(__filename), filename));




let sockets = [];

function User(username, password) {
  this.username = username;
  this.email = username;
  this.password = password;
}

User.register = function (socket, username, password, cb) {
  debug('log' + 'register\n');
  storage.read(function (error, users) {
    if (error) {
      cb(error);
      return;
    }
    if (users[username]) {
      debug('log' + '用户存在');
      cb(true);
      return;
    }
    users[username] = new User(username, password);

    storage.save(users, function (error) {
      if (error) {
        cb(error);
      }
      cb(false);
    });
  });
};

User.login = function (socket, username, password, cb) {
  debug('log' + 'user manager login');
  storage.read(function (error, users) {
    if (error) {
      cb(error);
      return;
    }
    if (!users[username]) {
      cb(true);
      return;
    }
    if (users[username].password === password) {
      cb(false);
      sockets.push({
        socket: socket,
        username: username
      });
      return;
    }
    else {
      cb(true);
    }
  });
};

/**
 * 判断当前地址是不是有用户拥有
 * @param {*} address 
 */
User.isAddress = function (address, cb) {
  debug('log' + 'isAdress\n');
  storage.read(function (error, users) {
    if (error) {
      cb(error);
      return;
    }
    for (var k in users) {
      if (!users[address]) {
        debug('log' + k);
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
    if (sockets[k].username === address) {
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
    for (var key in sockets) {
      if (sockets[key].socket === socket) {
        for (var k in users) {
          if (users[k].username === sockets[key].username) {
            cb(false, users[k]);
            return;
          }
        }
      }
    }
  });
};

exports.User = User;
// module.exports.User = User;