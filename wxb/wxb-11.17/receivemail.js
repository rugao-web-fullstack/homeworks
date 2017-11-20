// var use_info = require("./user_info").user_info;
//
// function receivemail(socket) {
//     socket.on("receivemail",function () {
//         socket.write("\n请输入邮箱查看邮件\n");
//         socket.on("data",function d(data) {
//             //---去除空格
//             data = data.toString().replace(/(^\s*)|(\s*$)/g, "");
//             var user = data.split(",")[0];
//             var index=use_info.returnmailArr().indexOf(user);
//             use_info.returnTitle(user);
//             use_info.returnSockets()[index].write(+"\n");
//         });
//     });
// }
//
// module.exports= receivemail;