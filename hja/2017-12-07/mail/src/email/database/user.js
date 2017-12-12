var insert = require('./insert');
var logincheck = require('./select');
var rechecks = require('./recheck');
var debug = require('debug')('users');
let UserList = {};



//注册
UserList.addUser = function (username, password, email, cb) {
  insert(username, password, email, function (err) {
    // if (err) {
    //   cb(true);
    //   return;
    // }
    debug(err);
    cb(false);
    return;
  });


};

//注册时检查是否已存在
UserList.recheck = function (username, cb) {
  rechecks(username, function (err) {
    if (err) {
      cb(true);
      return;
    }
    cb(false);
    return;
  });
};

//登录
UserList.login = function (username, password, cb) {

  logincheck(username, password, function (err, flag) {
    // if (err) {
    //   cb(true);
    //   return;
    // }
    if (flag !== 1) {
      cb(true, flag);
      return;
    }
    cb(false, flag);


  });

};
exports.Users = UserList; 