var p=0;
function fbnc(x){
	if(x==1||x==2){
		p=1;
	}else {
		p=fbnc(x-1)+fbnc(x-2);
	}
	return p;
}
module.exports = fbnc;

