var debug = require('debug')('log');
var mysql = require('mysql');

var connect=false;

var init = function (cb, db) {
  var options = {
    host: 'localhost',
    user: 'root',
    password: '1544'
  };
  //判断db数据库存不存在
  if (db) {
    options.database = db;
  }
  //创建数据库连接
  var con = mysql.createConnection(options);
  if(connect){
    cb instanceof Function && cb(con);
    return;
  }
  //连接数据库
  con.connect(function (err) {
    if (err) throw err;
    // console.log('Connected');
    connect=true;
    debug('log: '+'content');
    //返回的cd是函数类型，就执行cb(con)
    cb instanceof Function && cb(con);
    return;
  });
};
//谁第一个require他 parent就是谁
if (!module.parent) {
  init();
}
module.exports = init;