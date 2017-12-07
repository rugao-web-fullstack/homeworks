exports.hello = "Hello World";
var fib = function (n) {
  switch (n) {
    case 0:
    case 1:
      return 1;
    default:
   
       console.log(n);
      
      if (n < 0) {
        throw new Error("Error Input");
      }else{
   return fib(n - 2) + fib(n - 1);
}
  }
};

var arr = [];
 function han(n) {
   hanoi(n, 'a', 'b', 'c');
   var arrs = arr.join();
   arr = [];
   return arrs;
 }
 function hanoi(n, a, b, c) {
   if (n === 1) {
   arr.push('from ' + a + ' to ' + c);
   } else if (n <= 0) {
     throw new Error('Error Input');
   } else {
     hanoi(n - 1, a, c, b);
     arr.push('from ' + a + ' to ' + c);
     hanoi(n - 1, b, a, c);
   }
 }
exports.hunt = hunt;
exports.fib = fib;



