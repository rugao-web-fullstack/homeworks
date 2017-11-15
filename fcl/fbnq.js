module.exports = function(n){
      var arr = [1];
      var m = 0;
      var p = 1;
      var x;
      var re = /^[0-9]+$/;
      if(re.test(n)){
          for(var i=0;i<=n;i++){
                x = m + p;
	        m = p;
		p = x;
		if(x>=n){
		  break;
                }
                arr.push(x);
          }
          console.log(arr); 
      }else{
         console.log("the number is not true")    
    }
     
}