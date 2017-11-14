//斐波那契数列
function  fei(num) {
    var arr=new Array();
    for(var i=0;i<num;i++){
        if(i==0||i==1){
            arr.push(1);
        }else {
            arr.push(arr[i-1]+arr[i-2]);
        }
    } console.log(arr+'');
}
exports.fei1=fei;