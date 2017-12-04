//---引入User模块
const userArr = require('./User');

function Login(socket) {
    socket.on('Login', function fn() {
        socket.write('欢迎进入登录界面\n');
        socket.write('请输入用户名 密码,用空格隔开\n');
        socket.on('data', function func(data) {
            data = data.toString().split('\r\n')[0];
            let username = data.split(' ')[0];
            let password = data.split(' ')[1];
            //---检查
            if (userArr.login(username, password, socket) === 1) {
                socket.write('登录成功!即将为您跳转至主页面\n');
                socket.removeListener('data', func);
                //登录成功后将用户名放到MainPage
                socket.emit('MainPage', username);
                //登录成功后将online设置为true
            } else {
                socket.write('帐号或密码错误!\n');
                //重新进入Login事件
                socket.removeListener('data', func);
                socket.emit('Login');
            }
        })
    })
}

module.exports = Login;