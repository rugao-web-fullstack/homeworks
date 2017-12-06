//var usr = require('./databaseCon');
/* var debug = require('debug')('mail');
var client = usr.connect(); */
function Mail() {
   
}

/* Mail.prototype.write = function (client, receiver, sender, title, content, callback) {
    client.query('insert into mail value(?,?,?,?,?,?)', [, receiver, sender, 'false', title, content], function (err, result) {
        if (err) {
            debug('error:' + err.message);
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
}; */

module.exports = Mail;