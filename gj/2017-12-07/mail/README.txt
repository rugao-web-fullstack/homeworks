url
    /users                  
        /users/register             用户注册界面
        /users/login                用户登录界面

    /mails
        /mails/read                 查看邮件
        /mails/write                写邮件

API 设计
    /users
        POST /users
            action=register         注册
            action=login            登录

    /mails
        GET /mails/:id              通过邮件id, 查看邮件列表


        POST /mails
            action=send             发送邮件
