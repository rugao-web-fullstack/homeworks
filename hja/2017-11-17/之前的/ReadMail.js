const userArr = require('./User');

function ReadMail(socket) {
    socket.on('ReadMail', function (username) {
        socket.write('欢迎进入个人收件箱\n');
        for (let i = 0; i < userArr.length; i++) {
            if (userArr[i]['username'] === username) {
                for (let j = 0; j < userArr[i]['mail'].length; j++) {
                    socket.write('发送人:' + userArr[i]['mail'][j]['from'] + ' 内容为:' + userArr[i]['mail'][j]['content'] + '\n');
                }
            }
        }
        socket.write('按任意键返回主页面\n');
        socket.on('data', function func(data) {
            socket.removeListener('data', func);
            socket.emit('MainPage', username);
        });
    });
    socket.write('以下是您所有收到的消息\n');
}

module.exports = ReadMail;