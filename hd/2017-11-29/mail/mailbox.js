var DatabaseManage = require('./database.js');

var databaseManage = new DatabaseManage();

// function MailBox(user, address) {
//   this.user = user;
//   this.address = address;
// }

var MailBoxManage = {};

MailBoxManage.addMailBox = function (username, address, callback) {

  databaseManage.get('user', {
    'username': username
  }, function (err, result) {
    var userId = result[0].id;
    databaseManage.get('mailbox', {
      'address': address
    }, function (err, result) {
      if (result.length) {
        callback(new Error('该邮箱已经被添加!'));
      } else {
        databaseManage.add('mailbox', {
          'user': userId,
          'address': address
        }, function (err) {
          if (err) {
            callback(new Error('邮箱添加失败!'));
          } else {
            callback(null);
          }
        });
      }
    });


  });
};


MailBoxManage.getMailBox = function (username, callback) {

  databaseManage.get('user', {
    'username': username
  }, function (err, result) {
    var userId = result[0].id;
    databaseManage.get('mailbox', {
      'user': userId
    }, function (err, result) {
      if (result.length) {
        callback(null, result);
      } else {
        callback(new Error('邮箱不存在!'), []);
      }
    });
  });
};


module.exports = MailBoxManage;