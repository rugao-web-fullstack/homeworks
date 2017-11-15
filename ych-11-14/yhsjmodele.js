module.exports = function(){
	function Combination(m,n){  
            if(n == 0) return 1;   
            else if(m == n) return 1;  
            else return Combination(m-1,n-1)+Combination(m-1,n);  
        }  
        function Pascal(){   
		var str = ""; 	
            for( var i = 0 ; i < 8 ; i++ ){   
                for ( var j = 0 ; j <= i ; j++ ) { 
                    	str = str + Combination(i,j)+" ";  
                }  
		str = str + "\n";
            }  
	return str;
        }  
	return Pascal();
}
