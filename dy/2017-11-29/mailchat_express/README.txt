一、模块划分：
    前台模块
    API 模块：

    app.use('/', require('./routers/main'));
    app.use('/api', require('./routers/api'));

二、前台路由 + 模板
    main 模块：
        /       首页
        /user   用户
        /mail   邮件

    API 模块：
        /user
            action=[register&username=&address=&password=]
            action=[login&address=&password=]

        /mail
            action=[sendmail&sender=&receiver=&title=&body=]
            action=[writemail&sender=&receiver=&title=&body=]
