var insert = require('./insertmail');
var readAll = require('./readAll');
var details = require('./details');
var debug = require('debug')('mails');
let MailsList = {};

//发送---增加
MailsList.sendMail = function (sender, receiver, title, body, cb) {
  insert(receiver, sender, title, body, function (err) {
    // if (err) {
    //   cb(true);
    //   return;
    // }
    debug(err);
    cb(false);
    return;

  });

};


//查看所有
MailsList.readAll = function (username, cb) {
  readAll(username, function (err, data) {
    // if (err) {
    //   cb(true);
    //   return;
    // }
    debug(err);
    cb(false, data);
    return;
  });



};

//查看单独
MailsList.detail = function (id, cb) {
  details(id, function (err, data) {
    // if (err) {
    //   cb(true);
    //   return;
    // }
    debug(err);
    cb(false, data);
    return;
  });
};



module.exports.Mails = MailsList;