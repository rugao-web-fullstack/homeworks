module.exports = function(num){
    var arr=[];
    function fbc(n) {
        if(n==0||n==1){
            return 1;
        }else {
            return fbc(n-1)+fbc(n-2);
        }
    }
    for(var i=0;i<num;i++){
        arr.push(fbc(i));
    }
    console.log(arr);

}
