function yhsj(n){
	var a=new Array();
	for(var i=0;i<n;i++){
		if(i===0){
           		a.push(1);
        	}
        	else if(i===1){
            		a = new Array();
            		a.push(1);
            		a.push(1);
        	}
        	else{
            		var a2 = new Array();
            		a2.push(1);
            		for(var j = 0;j<a.length-1;j++){
                		a2.push(a[j]+a[j+1]);
            		}
            		a2.push(1);
            		a = new Array();
            		a = a2;
        	}
        	console.log(a+' ');
	}
}
module.exports=yhsj;
