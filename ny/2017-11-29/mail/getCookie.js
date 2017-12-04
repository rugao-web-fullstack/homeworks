module.exports = function getCookie(cookieString, key){
	var arr = cookieString.split('; ');
	for(var i = 0; i < arr.length; i++){
		var arr2  = arr[i].split('=');
		if(arr2[0] == key){
			return arr2[1];
		}
	}
}
