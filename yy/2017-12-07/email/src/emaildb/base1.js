var mysql=require('mysql');
var options = {
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USERNAME,
  password:process.env.MY_PASSWORLD	
};
var con = mysql.createConnection(options);
//var tested = false;
var init = function(cb,db){
  //if(db){
  options.database = db;
  //}
  con.connect(cbFunc(cb));
  /*if(tested){
		con.connect(cbFunc(cb));
		tested=true;
	}else{
		cb(con);
	}*/
};

var cbFunc = function cbFunc(cb) {
  return function(err){
    if(err){
      throw err;	
    }
    if(cb instanceof Function){
      cb(con);
    }
  };
};

//if(!module.parent){
//	init();
//}
//module.exports=init;
exports.cbFunc=cbFunc;
exports.init=init;

