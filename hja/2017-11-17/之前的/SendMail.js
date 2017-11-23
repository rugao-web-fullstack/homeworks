const userArr = require('./User');

function SendMail(socket) {
    //---若收件人不在线则无发发送
    socket.on('SendMail', function (username) {
        let receiver = '';
        let content = '';
        let true_flag = 0;
        //保存那个收件人对象
        let receiver_user = {};
        socket.write('发送人:' + username + '\n');
        socket.write('以下是所有用户名\n');
        for (let i = 0; i < userArr.length; i++) {
            if (userArr[i]['username'] !== username) {
                socket.write('用户名： ' + userArr[i]['username'] + '\n');
            }
        }
        socket.write('请填写收件人和发送内容 用空格隔开\n');
        socket.on('data', function func(data) {
            data = data.toString().split('\r\n')[0];
            receiver = data.split(' ')[0];
            content = data.split(' ')[1];
            //---去检查是否在线或者存在
            for (let i = 0; i < userArr.length; i++) {
                if (userArr[i]['username'] === receiver && userArr[i]['online'] === true) {
                    true_flag = 1;
                    receiver_user = userArr[i];
                }
            }
            if (true_flag === 1) {
                //这里表示对方在线,给予user一个在线提醒的事件，同时把该信息存进收件人的邮件里
                console.log(receiver_user);
                receiver_user.onlineReceive('您有新消息,来自:' + username + ',内容为:' + content);
                receiver_user.GetMail({
                    'from': username,
                    'content': content
                });
                socket.write('发送成功!即将跳转至主页面\n');
                socket.removeListener('data', func);
                socket.emit('MainPage', username);
            } else {
                socket.write('该用户不存在或不在线,无法发送!,即将为您跳转至主页面\n');
                //此时返回到主页面
                socket.removeListener('data', func);
                socket.emit('MainPage', username);
            }

            socket.removeListener('data', func);
        });


    })
}

module.exports = SendMail;