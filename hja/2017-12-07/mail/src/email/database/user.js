var insert = require('./insert');
var logincheck = require('./select');
var rechecks = require('./recheck');
let UserList = {};
var cbs = require('./cb').cb;



//注册
UserList.addUser = function (username, password, email, cb) {
  insert(username, password, email, cbs(function () {
    cb(false);
    return;
  },cb));


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

  logincheck(username, password, cbs(function(flag) {
    if (flag !== 1) {
      cb(true, flag);
      return;
    }
    cb(false, flag);


  },cb));

};
exports.Users = UserList; 
