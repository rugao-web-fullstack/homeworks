var debug = require('debug')('user_info');

//---用户信息
function user_info(mailname, password) {
    this.mailname = mailname;
    this.password = password;
}

var mailArr = [];
var pwdArr = [];
var sockets = [];
var mailTitle = {};
var mailContent = {};

user_info.mail = function (mailname, pwd,socket) {
    mailArr.push(mailname);
    pwdArr.push(pwd);
    sockets.push(socket);
    debug('log: '+'mailArr : ' + mailArr + ' \npwd :' + pwdArr+'-'+sockets.length);
};

// user_info.mailTitle = function (user,title) {
//     mailTitle.push([user,title]);
// }
//
// user_info.returnTitle=function (user) {
//     return mailTitle;
// }

// user_info.mailContent=function (user,content) {
//     mailContent.push({user:content});
//     return mailContent;
// }

user_info.returnmailArr=function () {
    return mailArr;
};

user_info.returnSockets = function () {
    return sockets;
};

user_info.login = function (mailname, pwd) {
    //---先判断在不在数组内，通过判断在数组中的位置符不符合来进行用户名和密码的匹配
    if (mailArr.indexOf(mailname) != -1 && pwdArr.indexOf(pwd) != -1 && mailArr.indexOf(mailname) == pwdArr.indexOf(pwd)) {
        return true;
    } else {
        return false;
    }
};
exports.user_info = user_info;