var mysql=require('mysql');

var options = {
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USERNAME,
  password:process.env.MY_PASSWORLD	
};
	
var con = mysql.createConnection(options);
var cbFunc = function cbFunc(cb) {
  return function(err){
    if(err){
      throw err;	
    }
    cb instanceof Function && cb(con);
  };
};

var init = function(cb,db){
  options.database = db;
  con = mysql.createConnection(options);
  con.connect(cbFunc(cb));
};
exports.cbFunc=cbFunc;
exports.init=init;
//module.exports=init;
