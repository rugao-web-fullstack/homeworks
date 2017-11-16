var net = require("net");
var readline = require("readline");
//创建readline接口实例
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var client = new net.Socket();
client.connect(8080,'localhost');
client.on('connect',function () {
    console.log("成功连接服务器");
    rl.question("请输入用户名和密码进行注册\n", function (name,password) {
        client.write(name,password);
        // 不加close，则不会结束
        rl.close();
    });
});
client.on('data',function (data) {
    console.log("恭喜你!"+data.toString()+" 注册成功");
});