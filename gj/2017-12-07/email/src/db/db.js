var mysql = require('mysql');

//定义链接事件
var connect = false;

var options = {
  // host: 'localhost',
  // user: 'root',
  // password: '1544'
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
};

var cbDb = function cbDb(cb, con) {
  return function (err) {
    if (err) {
      throw err;
    }
    if (cb instanceof Function) {
      connect = true;
      cb(con);
    }
  };
};

exports.init = function (cb, db) {
  //判断db数据库存不存在
  if (db) {
    options.database = db;
  }
  //创建数据库连接
  var con = mysql.createConnection(options);
  //判断是否已经链接数据库
  if (connect) {
    cb instanceof Function && cb(con);
    return;
  }
  con.connect(cbDb(cb, con));
};

//谁第一个require他 parent就是谁
// if (!module.parent) {
//   init();
// }
exports.cbDb = cbDb;
// module.exports = init;