var use_info = require('./user_info').user_info;
//---注册
function register(socket) {
    // console.log("register");
    socket.on('register', function reg() {
        socket.write('请输入您的邮箱和密码进行注册，以“,”隔开\n');
        socket.on('data',function d(data) {
            //---去除空格
            data = data.toString().replace(/(^\s*)|(\s*$)/g, '');
            // console.log(data.toString());
            var mailname=data.split(',')[0];
            var pwd = data.split(',')[1];
            // console.log(mailname+":"+pwd);
            if (mailname.length>=5) {
                use_info.mail(mailname,pwd,socket);
                socket.write('注册成功\n\n');
                socket.emit('mainpage');
                socket.removeListener('data',d);
            }else {
                socket.write('注册失败\n\n');
                socket.emit('mainpage');
                socket.removeListener('data',d);
            }

        });
    });
}

module.exports = register;