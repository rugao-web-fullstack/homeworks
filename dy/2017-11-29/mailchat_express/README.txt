url:
    /users
    /users/register
    /users/login
    /users/logout

    /mails
    /mails/send
    /mails/write
    /mails/delete

API 设计：
    /user
        GET  /uses:id               通过用户id, 查看用户列表
             /users/?page=          分页查看用户信息
        POST /users
            action=register         注册
            action=login            登录
            action=logout           退出

    /mail
        GET /mails:id               通过邮件id, 查看邮件列表
            /mails/?page=           分页查看邮件列表

        POST /mails
            action=send             发送邮件
            action=write            写邮件
            action=delete           删除邮件