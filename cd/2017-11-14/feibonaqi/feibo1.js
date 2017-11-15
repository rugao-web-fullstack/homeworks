function fei(m) {
    var arr = new Array();
    for(var i = 0;i < m;i++){
        if(i === 0){
            arr.push(1);
        }else if(i === 1){
            arr.push(1);
        }else{
            arr.push(arr[i-1] + arr[i-2]);
        }
    }
    console.log(arr + '');
}
exports.fei = fei;