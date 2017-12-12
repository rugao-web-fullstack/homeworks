var mysql = require('mysql');
var pool = mysql.createPool({
  // host:'localhost',
  // user:'root',
  // password:'1996weixinbo',
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database:'mail'
});

function query(sql,callback){
  pool.getConnection(function(err,connection){
    connection.query(sql, function () {
    });
  });
  callback('connected');
}

exports.query = query;
