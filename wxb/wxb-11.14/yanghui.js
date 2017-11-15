var yanghui = require("./yanghui-module");

var readline = require("readline");
//创建readline接口实例
var  rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// question方法
rl.question("请输入n的值\n",function(n){
    var yang = new yanghui(n);
    console.log(yang);
    // 不加close，则不会结束
    rl.close();
});

// close事件监听
rl.on("close", function(){
    // 结束程序
    process.exit(0);
});
