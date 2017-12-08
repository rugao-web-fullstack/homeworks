var mysql = require('mysql');
//var debug = require('debug')('mail');
function connectServer() {

    var client = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: 'mydb'
    });

    return client;
}

var callbackFunc = function(cb){
    return function (err){
        if(err){
            throw err;
        }
        if(cb instanceof Function){
            cb(connectServer());
        }
    };
};
exports.callbackFunc = callbackFunc;

exports.mysql = function(cb){
    var con = connectServer();
    con.connect(callbackFunc(cb));
    con.end();
};

