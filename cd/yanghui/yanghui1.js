function yang(row) {
    //---定义数组
    var arr = new Array();
    //---循环遍历
    for(var i = 0;i<row;i++){
        if(i===0){
            arr.push(1);
        }
        else if(i===1){
            arr = new Array();
            arr.push(1);
            arr.push(1);
        }
        else{
            //--新建数组
            var arr2 = new Array();
            //--开头一个1
            arr2.push(1);
            //--中间数字由上一个数组得两位相加得到
            for(var j = 0;j<arr.length-1;j++){
                arr2.push(arr[j]+arr[j+1]);
            }
            //--结尾一个1
            arr2.push(1);
            //将arr重新定义，取arr2的值来充当上一行。
            arr = new Array();
            arr = arr2;
        }
        //---按顺序每次输出arr
        console.log(arr+'');
    }
}
exports.test = yang;