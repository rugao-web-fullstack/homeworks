module.exports = function(){
function fbnq(m){
	 if (m <= 2) {  
        return 1  
    			}  
    	return  fbnq(m - 1) + fbnq(m-2);  
}
function print(n){
	for(var i=1;i<=n;i++){
	console.log(fbnq(i));
}	
}
print(3);
}
