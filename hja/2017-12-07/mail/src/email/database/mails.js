var insert = require('./insertmail');
var readAll = require('./readAll');
var details = require('./details');
let MailsList = {};
var cbs = require('./cb').cb;

//发送---增加
MailsList.sendMail = function (sender, receiver, title, body, cb) {
  insert(receiver, sender, title, body, cbs(function() {
    cb(false);
    return;

  },cb));

};


//查看所有
MailsList.readAll = function (username, cb) {
  readAll(username, cbs(function(data) {
    cb(false, data);
    return;
  },cb));



};

//查看单独
MailsList.detail = function (id, cb) {
  details(id, cbs(function(data) {
    cb(false, data);
    return;
  },cb));
};



module.exports.Mails = MailsList;
