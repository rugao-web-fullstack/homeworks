exports.hello = 'Hello World';
const fib=function(n){
  switch(n){
  case 0:
  case 1:
    return 1;
  default:
    if(n<0){
      throw new Error('Error Input');
    }
    return fib(n-2)+fib(n-1);
  }
};
exports.fib = fib;
const te=function(n){
  var count = 0;
  const hanoi = function(disc,src,aux,dst){
    if(disc>0){
      hanoi(disc - 1, src, dst, aux);
      count = count+1;
      hanoi(disc - 1, aux, src, dst);
    }else if(disc<0){
      throw new Error('Error Input');
    }
  };
  hanoi(n,'a','b','c');
  return count;
};
exports.te = te;

