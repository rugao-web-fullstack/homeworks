function Hello(n) {  
  var res = [1,1];  
  if(n == 1 || n == 2){  
	    return 1;  
  }        
  for(var i=2;i<n;i++){  
	    res[i] = res[i-1] + res[i-2];  
  }   
  console.log(res);
} 
module.exports.Hello = Hello;