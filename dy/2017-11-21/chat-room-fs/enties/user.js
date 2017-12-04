var debug = require('debug')('log');
const path = require('path');
const FILENAME = '../data/user.json';
const Storage = require('./storage').Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), FILENAME));

let sockets = [];

function User(username, password) {
  this.username = username;
  this.email = username;
  this.password = password;
}
User.register = function (socket, username, password, cb) {
  debug('log' + 'inside Register');
  debug('log' + cb);

  sockets[username] = socket;

  storage.read((error, users) => {
    if (error) {
      debug('log' + error);
      cb(error);
      return;
    }
    if (users[username]) {
      cb(true);
    }

    users[username] = {
      user: new User(username, password)
    };
    storage.save(users, (error) => {
      if (error) {
        cb(error);
      }
      cb instanceof Function && cb(false);
    });
  });

};
User.login = function (socket, username, password, cb) {
  storage.read((error, users) => {
    if (!users[username] || error) {
      socket.write('# 输入错误！ #');
      socket.write('\n请重新输入：');
      return;
    }
    if (users[username].user.username === username && users[username].user.password === password) {
      cb(true);
      for (let i = 0; i < sockets.length; i++) {
        if (sockets[i].now === username) {
          sockets[i].socket = socket;
        }
      }
      sockets.push({
        socket: socket,
        now: username
      });
      debug('log' + 'NOW SOCKETS=> ' + sockets);
    } else {
      cb(false);
    }
  });
};

// 判断当前地址是不是用户拥有
User.isAddress = function (address, cb) {
  storage.read((error, users) => {
    if (error) {
      cb(error);
      return;
    }
    for (var k = 0; k < users.length; k++) {
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

// 根据地址获取用户 socket
User.getSocket = function (address) {
  for (var k in sockets) {
    if (sockets[k].now === address) {
      return sockets[k].socket;
    }
  }
  return null;
};

// 根据 socket 获取用户
User.getUserBySocket = function (socket, cb) {
  storage.read((err, user) => {
    if (err) {
      cb instanceof Function && cb(err, null);
      return;
    }

    for (var k in sockets) {
      if (sockets[k].socket === socket) {
        for (var i in user) {
          if (user[i].user.username === sockets[k].now) {
            cb(false, user[i].user);
            return;
          }
        }
      }
    }
    cb(false, null);
  });
};

module.exports.User = User;