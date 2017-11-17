let userArr = require("./user.js");

function login(socket) {
    //注册login事件
    socket.on("login", function () {
        socket.write('\n请输入邮箱和密码,用空格分开\n');
        socket.on("data", function fn(data) {
            data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, "");
            let userName = data.split(" ")[0];
            let password = data.split(" ")[1];
            if (userArr.checkUser(userName, password)) {
                if(userArr[userName].isOnline()){
                    socket.write("该账户已经登陆!\n");
                    socket.removeListener("data", fn);
                    socket.emit("mainPage");
                }else{
                    socket.removeListener("data", fn);
                    socket.write("账户登录成功!\n");
                    userArr[userName].online(socket); //用户上线.
                    socket.emit("userPage", userName);
                }
            } else {
                socket.removeListener("data", fn);
                socket.write("账号未注册或输入错误!\n");
                socket.emit("mainPage");
            }
        })
    })

}

module.exports = login;