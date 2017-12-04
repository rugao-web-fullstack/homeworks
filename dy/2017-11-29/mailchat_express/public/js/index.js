var debug = require('debug')('log');
$(function () {
    var $goRegister = $('#goRegister');
    var goLogin = $('#goLogin');

    // 注册界面和登录界面的跳转
    $goRegister.click(function () {
        $('.r-side-register').show();
        $('.r-side-login').hide();
    });
    $goLogin.click(function () {
        $('.r-side-login').show();
        $('.r-side-register').hide();
    });

    // 点击注册
    $('.register').click(function () {
        // 通过ajax请求发送注册信息
        $.ajax({
            type: 'post',
            url: 'api/register',
            data: {
                username: $('#username').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                repassword: $('#repassword').val()
            },
            dataType: 'json',
            success: function (data) {
                debug('log' + data);
            }
        });

        return false;
    });
});