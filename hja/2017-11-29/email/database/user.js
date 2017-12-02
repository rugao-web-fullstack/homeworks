var insert = require('./insert');
var logincheck = require('./select');
var rechecks = require('./recheck');

let UserList = {};



//注册
UserList.addUser = function (username, password, cb) {
    insert(username, password, function (err) {
        if (err) {
            console.log('注册失败');
            cb(true);
            return;
        }
        console.log('注册了');
        cb(false);
        return;
    });


}

//注册时检查是否已存在
UserList.recheck = function (username, cb) {
    console.log('进来lll');
    rechecks(username, function (err) {
        if (err) {
            cb(true);
            return;
        }
        cb(false);
        return;
    });
}

//登录
UserList.login = function (username, password, cb) {

    logincheck(username, password, function (err, flag) {
        if (err) {
            cb(true);
            return;
        }
        if (flag !== 1) {
            cb(true, flag);
            return;
        }
        cb(false, flag);


    });

    // if(!UserList[username]){
    //     return false;
    // } else {
    //     if(UserList[username].password === password){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}
exports.Users = UserList; 