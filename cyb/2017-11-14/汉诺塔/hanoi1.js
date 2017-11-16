const Hanoi = require('./Hanoi');
const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('请输入数列长度：', function(n){
    var arr = Hanoi(n);
    for(var i = 0; i < arr.length ; i++){
        console.log(arr[i]);
    }
});
