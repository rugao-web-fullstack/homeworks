var debug=require('debug')('xxx');
var cb=function(next){
  return function(err,data){
    if(err){
      debug('log'+err);
      return;
    }
    next(data);
  };
};
exports.cb=cb;