let userArr = require("./user.js");

function readMail(socket) {
    //注册readMail事件
    socket.on("readMail", (userName) => {
        socket.write("\n邮件列表\n");
        for (var i = 0; i < userArr[userName].mail.length; i++) {
            socket.write("序号：" + i + "\t");
            socket.write("发件人：" + userArr[userName].mail[i].sender + "\t");
            socket.write("发送时间：" + userArr[userName].mail[i].time + "\n");
        }
        if (i == 0) {
            socket.write('\n邮件列表为空\n');
            socket.emit("userPage", userName);
        } else {
            socket.write('\n请输入邮件序号读取邮件：');
            socket.on("data", function fn(index) {
                index = index.toString().replace(/[^0-9]?/g, "");
                if (userArr[userName].mail[index]) {
                    socket.removeListener("data", fn);
                    socket.write("\n邮件内容：\n");
                    socket.write(userArr[userName].mail[index].mailMessage + '\n');
                    socket.emit("userPage", userName);
                } else {
                    socket.removeListener("data", fn);
                    socket.write("邮件序号不存在!\n");
                    socket.emit("userPage", userName);
                }
            })
        }


    })

}

module.exports = readMail;