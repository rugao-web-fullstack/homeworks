module.exports = function yanghui(n){
	var tArray = new Array();  
	var str = "";
	for(var i = 0; i < n; i++){    
	 
		tArray[i] = new Array();  
	 
		for(var j = 0; j < n; j++){  
		
			tArray[i][0] = 1;
			tArray[i][i] = 1;   
		}
		
	}
	for(var i = 2; i < n; i++){    
	 
		for(var j = 1; j < i; j++){  
		
			tArray[i][j] = tArray[i-1][j-1]+tArray[i-1][j]; 
		}
		
	}
	
	for(var i = 0; i < n; i++){    
	 	
		str = str+tArray[i]+" "+"\n";
 	
	}
	
	return str;

}
