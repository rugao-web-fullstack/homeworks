url:
    /user
    /user/regster
    /user/login
    /user/logout

    /mail
    /mail/sendmail
    /mail/writemail
    /mail/deletemail

API 设计：
    /user
        GET  /user:id
            /user/?page=
        POST /user
            action=register         注册
            action=login            登录
            action=logout           退出

    /mail
        GET /mail:id
            /mail/?page=

        POST /mail
        action=sendmail         发送邮件
        action=writemail        写邮件
        action=deletemail       删除邮件