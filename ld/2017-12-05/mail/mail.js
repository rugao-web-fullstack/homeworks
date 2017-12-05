var usr = require('./databaseCon');
client = usr.connect();
function Mail(receiver, sender, title, content) {
    this.username = username;
    this.email = username;
    this.password = password;
}

Mail.prototype.write = function (client, receiver, sender, title, content, callback) {
    client.query('insert into mail value(?,?,?,?,?,?)', [, receiver, sender, 'false', title, content], function (err, result) {
        if (err) {
            console.log('error:' + err.message);
            return err;
        }
        callback(err);
    });
};

Mail.prototype.read = function (client, callback) {
    client.query('select password from user where username="' + username + '"', function (err, results, fields) {
        if (err) throw err;

        callback(results);
    });
};

module.exports = Mail;