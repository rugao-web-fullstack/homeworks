var debug = require('debug')('c');
module.exports = function(){
  function abc(n){
    if(n == 0)
    {
      return 0;
    }else if(n == 1)
    {
      return 1;
    }else{
      return abc(n-1)+abc(n-2);
    }
  }
  debug('log'+'斐波那契数列的第20项:'+abc(20));
};
