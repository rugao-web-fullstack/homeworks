module.exports = function(n){
      var arr = [];
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
                arr.push(0);
                var b = arr.join("");
                console.log(b); 
          }
      }else{
         console.log("the number is not true")    
    }
     
}