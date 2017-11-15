module.exports = function(){
	function Combination(m,n){  
            if(n == 0) return 1;   
            else if(m == n) return 1;  
            else return Combination(m-1,n-1)+Combination(m-1,n);  
        }  
        function Pascal(){    	
            for( var i = 0 ; i < 8 ; i++ ){   
		var str = ""; 
                for ( var j = 0 ; j <= i ; j++ ) { 
                    	str = str + Combination(i,j)+" ";  
                }  
              console.log(str + "\n");
            }  
        }  
	Pascal();
}
