function mainpage(socket) {
    socket.on('mainpage', function () {
        socket.write('请选择功能:\n 1.注册 2.登录\n');
        socket.on('data', function d(data) {
            //-------------不加这行会有不同输出
            data = data.toString().replace(/[^a-zA-Z0-9_ ]?/g, '');
            if (data == '1') {
                socket.removeListener('data',d);
                socket.emit('register');
                // console.log(1);
            } else if (data == '2') {
                socket.removeListener('data',d);
                socket.emit('login');
                // console.log(2);
            }
        });
    });

}

module.exports = mainpage;