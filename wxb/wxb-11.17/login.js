var use_info = require("./user_info").user_info;
//---登录
function login(socket) {
    // socket.write("登录：\n");
    socket.on("login",function log() {
        socket.write("请输入邮箱和密码进行登录，以“,”隔开\n");
        socket.on("data",function d(data) {
            //---去除空格
            data = data.toString().replace(/(^\s*)|(\s*$)/g, "");
            // console.log(data.toString());
            var mailname=data.split(",")[0];
            var pwd = data.split(",")[1];
            if (use_info.login(mailname,pwd)==true) {
                socket.write("登录成功\n\n");
                socket.emit("userpage");
                socket.removeListener("data",d);
            }else {
                socket.write("登录失败，用户名或密码不正确\n\n");
                socket.emit("mainpage");
                socket.removeListener("data",d);
            }

        });
        // socket.write("登录成功：\n");
        // socket.emit("mainpage");
    });
}

module.exports = login;