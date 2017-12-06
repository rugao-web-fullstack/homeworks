var mysql = require('mysql');
var debug = require('debug')('mail');
function connectServer() {

    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1212',
        database: 'mydb'
    });

    return client;
}


function selectUser(client, username, callback) {
    //client为一个mysql连接对象
    client.query('select * from user where username="' + username + '"', function (err, results) {
        if (err) throw err;

        callback(results);
    });
}

function selectAll(client, username, password, callback) {
    //client为一个mysql连接对象
    client.query('select * from user where username="' + username + '" and password="' + password + '"', function (err, results) {
        if (err) throw err;

        callback(results);
    });
}

function insertUser(client, username, password, callback) {
    client.query('insert into user (username,email,password)', [username, username, password], function (err, result) {
        if (err) {
            debug('error:' + err.message);
            return err;
        }
        callback(result);
    });
}

/* function writeFun(client, receiver, sender, title, content, callback) {
    client.query('insert into mail value(?,?,?,?,?,?)', [, receiver, sender, 'false', title, content], function (err, result) {
        if (err) {
            console.log("error:" + err.message);
            return err;
        }
        callback(err);
    });
} */

/* function Mail() { };
function readFun(client, callback) {
    //client为一个mysql连接对象
    Mail.prototype.readMail = function (callback) {
        client.query('select * from mail', function (err, result) {
            callback(err, result);
        });
    }

} */

exports.connect = connectServer;
exports.selectUser = selectUser;
exports.insertUser = insertUser;
exports.selectAll = selectAll;
