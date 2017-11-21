function Index(socket) {

    socket.on('Index', function () {
        //进入首页事件
        socket.write('欢迎进入邮件系统,请选择指令\n');
        socket.write('1.注册\n2.登录\n3.退出\n');
        socket.on('data', function func(data) {
            var choice = data.toString().split('\r')[0];
            if (choice == 1) {
                //--移除data事件
                socket.removeListener('data', func);
                //--为socket添加事件register
                socket.emit('Register');
            } else if (choice == 2) {
                socket.removeListener('data', func);
                //--为socket添加事件login
                socket.emit('Login');
            } else if (choice == 3) {
                socket.removeListener('data', func);
                socket.end('退出系统');
            }
        })
    })

}

module.exports = Index;