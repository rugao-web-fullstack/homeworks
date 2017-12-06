$(function () {
    var $goRegister = $('#goRegister');
    var $goLogin = $('#goLogin');

    // 注册界面和登录界面的跳转
    $goRegister.click(function () {
        $('#username').val('');
        $('#mail').val('');
        $('#password').val('');
        $('#repassword').val('');
        $('.r-side-register').show();
        $('.r-side-login').hide();
        $('.register-warnning').html('');
    });
    $goLogin.click(function () {
        $('#email').val('');
        $('#pwd').val('');
        $('.r-side-login').show();
        $('.r-side-register').hide();
        $('.login-warnning').html('');
    });

    // 点击注册
    $('.register').click(function () {
        // 通过ajax请求发送注册信息
        $.ajax({
            type: 'post',
            url: 'api/register',
            data: {
                username: $('#username').val(),
                mail: $('#mail').val(),
                password: $('#password').val(),
                repassword: $('#repassword').val()
            },
            dataType: 'json',
            success: function (data) {
                $('.register-warnning').html(data.message);
                if (!data.code) {
                    // 注册成功
                    setTimeout(function () {
                        $('.r-side-login').show();
                        $('.r-side-register').hide();
                    }, 3000);
                }
            }
        });

        return false;
    });

    // 点击登录
    $('.login').click(function () {
        $.ajax({
            type: 'post',
            url: 'api/login',
            data: {
                email: $('#email').val(),
                pwd: $('#pwd').val(),
            },
            dataType: 'json',
            success: function (data) {
                $('.login-warnning').html(data.message);
                if (data.code == 5) {
                    // 登录成功
                    window.location.reload();
                }
            }
        });
        return false;
    });

    // 点击退出
    $('.logout').click(function () {
        $.ajax({
            url: 'api/logout',
            success: function () {
                // debug('log' + data);
                window.location.reload();
            }
        });
    });

    // 点击编写邮件

    // 点击查看邮件

});