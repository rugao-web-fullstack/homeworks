//引入用户模块
const userArr = require('./User');

function Register(socket) {
    //注册事件
    socket.on('Register', function func() {
        socket.write('欢迎进入注册页面\n');
        socket.write('请输入用户名 密码,空格分开\n');

        socket.on('data', function func(data) {
            data = data.toString().split('\r\n')[0];
            let username = data.split(' ')[0];
            let password = data.split(' ')[1];
            //--添加
            userArr.add(username, password);
            //注册成功后返回首页
            socket.write('注册成功！\n');
            socket.removeListener('data', func);
            socket.emit('Index');
        });
    })

}

module.exports = Register;