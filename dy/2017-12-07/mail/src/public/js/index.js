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
      url: 'api/user/register',
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
      url: 'api/user/login',
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
      url: 'api/user/logout',
      success: function () {
        window.location.reload();
      }
    });
  });

  // 点击发送邮件面板
  $('.send-mail').click(function () {
    $('.writeMail').show();
    $('.readMail').hide();
  });
  // 点击发送邮件
  $('.send').click(function () {
    $.ajax({
      type: 'post',
      url: 'api/mail/send',
      data: {
        title: $('#title').val(),
        receiver: $('#receiver').val(),
        mailbody: $('#mailbody').val()
      },
      dataType: 'json',
      success: function (data) {
        $('.send-warning').html(data.message);
        if (data.code == 7) {
          // 找到该邮箱并发送邮件
          setTimeout(function () {
            $('.send-warning').html('发送成功！');
          }, 2000);
        }
      }
    });

    return false;
  });

  // 点击查看邮件面板
  $('.my-mail').click(function() {
    $('.readMail').show();
    $('.writeMail').hide();

    $.ajax({
      type: 'get',
      url: 'api/mail',
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        var html = '';
        for (var i = 0; i < data.length; i ++) {
          html = $('<tr><td>' + data[i].isRead + '</td><td>' + data[i].title + '</td><td>' + data[i].sender + '</td><td>'  + data[i].time + '</td><td><a href="javascript:;">删除邮件</a><a href="javascript:;">查看邮件</a></td></tr>');
          $('.mail-list').children('tbody').html(html);
        }
      }
    });
  });

  // 点击删除邮件


});