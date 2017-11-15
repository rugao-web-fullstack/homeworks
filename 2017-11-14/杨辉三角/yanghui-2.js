const yanghui = require('./yanghui-1');
const readline = require('readline');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.question('请输入数列长度：',function(n){
    var arr = yanghui(n);
    for(var i=0;i<n;i++){
        console.log(arr[i]);
    }
});