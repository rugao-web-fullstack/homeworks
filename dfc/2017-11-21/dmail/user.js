const EventEmitter = require('events');
const emitter = new EventEmitter();
//const Message = require('./message').Message;
const filename = './data/fileUsers.json';
const path = require('path');
var debug = require('debug')('xxx');
const Storage = require('./storage').Storage;
const storage = new Storage(path.resolve(path.dirname(__filename), filename));

function User(event, userlist) {
  this.event = event;
  this.userlist = userlist;
  debug('log:' + 'user: constructor');
}
User.prototype.register = function (username, password, socket) {
  debug('log:' + 'user: register');
  storage.read((error, users) => {
    if (error) {
      debug('error:' + error.stack);
      return;
    }
    users.push({
      'username': username,
      'password': password
    });
    debug('log:' + this.userlist.length + '---------------');
    if (this.userlist.length === 0) {
      for (let i = 0; i < users.length; i++) {
        //      let userid = users[i].username;
        this.userlist.push({
          //        userid: ''
        });
      }
      this.userlist[username] = socket;
    } else {
      debug('log:' + this.userlist.length + '--*--------');
      debug('log:' + username + '--*--------');
      debug('log:' + socket + '--*--------');
      this.userlist.push({
        username: ''
      });
      this.userlist[username] = socket;
      debug('log:' + this.userlist.length + '----*---------');
      debug('log:' + this.userlist[username]);
    }
    storage.save(users, (error) => {
      if (error) {
        debug('error:' + error.stack);
        return;
      }
      emitter.emit('user-register', socket, true);
      debug('log:' + username + '用户注册成功');
    });
  });
};
User.prototype.login = function (username, password, socket) {
  debug('log:' + 'user: login');
  storage.read((error, users) => {
    if (error) {
      debug('error:' + error.stack);
      return;
    }
    var user = findUser(username);
    if (user) {
      if (user.password === password) {
        if (this.userlist.length === 0) {
          debug('log:' + '用户表还是空的');
          debug('log:' + this.userlist);
          for (let i = 0; i < users.length; i++) {
            //          let userid = users[i].username;
            this.userlist.push({
              //            userid: ''
            });
          }
          this.userlist[username] = socket;
        } else {
          debug('log:' + '用户表有东西了');
          debug('log:' + this.userlist);
          this.userlist[username] = socket;
        }
        emitter.emit('user-login', socket, true);
      } else {
        emitter.emit('user-login', socket, false);
      }
    } else {
      socket.write('该账号不存在，请重新输入\n');
    }

    function findUser(username) {
      for (let i = 0; i < users.length; i++) {
        if (username === users[i].username) {
          return users[i];
        }
      }
      return false;
    }
  });
  // });
};
exports.User = User;