$(function () {
    $("#login").on("click", function () {
        $.ajax({
            type: "POST",
            url: "/login-confirm",
            dataType: "json",
            data: {"mail": $("#mail").val(), "pwd": $("#pwd").val()},
            error:function (xhr, statusText, error) //当访问发生错误或者跳转指令的时候在这里
                //处理
            {
                console.log(xhr.responseText);//这里拿到了新的页面的html
                window.location.href="/welcome";//这里可以跳转到新的页面
            },
            success : function(data) {        //正常返回结果在这里处理
                console.log(data);
            }
        });

    });
});