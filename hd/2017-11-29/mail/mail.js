var DatabaseManage = require('./database.js');

var databaseManage = new DatabaseManage();

function Mail(sender, receiver, title, content) {
  this.sender = sender;
  this.receiver = receiver;
  this.title = title;
  this.content = content;
  this.date = (new Date()).toLocaleString();
}

var MailManage = {};

MailManage.addMail = function (sender, receiver, title, content, callback) {
  var mail = new Mail(sender, receiver, title, content);
  databaseManage.get('mailbox', {
    'address': sender
  }, function (err, result) {
    if (result.length) {
      databaseManage.get('mailbox', {
        'address': receiver
      }, function (err, result) {
        if (result.length) {
          databaseManage.add('mail', mail, function () {
            databaseManage.get('mail', mail, function (err, result) {
              var mailId = result[0].id;
              databaseManage.get('mailbox', {
                'address': receiver
              }, function (err, result) {
                var mailboxId = result[0].id;
                databaseManage.add('mail_mailbox', {
                  'mail': mailId,
                  'mailbox': mailboxId
                }, function () {
                  callback(null);
                  return;
                });
              });
            });
          });
        } else {
          callback(new Error('收件地址不存在'));
        }
      });
    } else {
      callback(new Error('发件地址不存在'));
    }
  });

};

MailManage.getMail = function (username, callback) {
  databaseManage.get('user', {
    'username': username
  }, function (err, result) {
    if (result.length) {
      var userId = result[0].id;
      databaseManage.get('mailbox', {
        'user': userId
      }, function (err, result) {
        var mailboxIdArr = [];
        for (var i = 0; i < result.length; i++) {
          mailboxIdArr.push(result[i].id);
        }

        if (!mailboxIdArr.length) {
          callback(null, []);
          return;
        }
        databaseManage.get('mail_mailbox', {
          'mailbox': mailboxIdArr
        }, function (err, result) {
          var mailIdArr = [];
          for (var i = 0; i < result.length; i++) {
            mailIdArr.push(result[i].id);
          }

          if (!mailIdArr.length) {
            callback(null, []);
            return;
          }

          databaseManage.get('mail', {
            'id': mailIdArr
          }, function (err, result) {
            callback(null, result);
          });
        });
      });
    } else {
      callback(new Error('用户名不存在!'));
    }

  });

};


module.exports = MailManage;