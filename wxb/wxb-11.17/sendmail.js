var use_info = require('./user_info').user_info;

function sendmail(socket) {
    socket.on('sendmail',function () {
        socket.write('\n请输入邮箱，标题，内容\n');
        socket.on('data',function d(data) {
            //---去除空格
            data = data.toString().replace(/(^\s*)|(\s*$)/g, '');
            var user = data.split(',')[0];
            var title = data.split(',')[1];
            var content = data.split(',')[2];
            var index=use_info.returnmailArr().indexOf(user);
            // use_info.mailTitle(user, title);
            // use_info.mailContent(user, content);
            use_info.returnSockets()[index].write(user+'，您有一封信邮件，请查看（如果没有登录请先登录）\n');
        });
    });
}

module.exports= sendmail;