var use_info = require('./user_info').user_info;

function userpage(socket) {
    socket.on('userpage', function () {
        socket.write('\n欢迎来到邮件服务系统\n1.发送邮件\t2.查看邮件\t3.退出登录\n请输入:');
        socket.on('data', function d(data) {
            //---去除空格
            data = data.toString().replace(/(^\s*)|(\s*$)/g, '');
            if (data == '1') {
                socket.emit('sendmail');
                socket.removeListener('data',d);
            } else if (data == '2') {
                socket.emit('receivemail');
                socket.removeListener('data',d);
            } else if (data == '3') {

            }
        });
    });
}

module.exports = userpage;