let userArr = require("./user.js");

function register(socket) {
    //注册register事件
    socket.on("register", () => {
        socket.write('\n请输入注册邮箱和密码,用空格分开\n');
        socket.on("data", function fn(data) {
            data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, "");
            let userName = data.split(" ")[0];
            let password = data.split(" ")[1];
            if (userArr.addUser(userName, password)) {
                socket.removeListener("data", fn);
                socket.write("用户注册成功!\n");
                socket.emit("mainPage");
            } else {
                socket.removeListener("data", fn);
                socket.write("该账户已被注册!\n");
                socket.emit("mainPage");
            }
        })
    })

}

module.exports = register;