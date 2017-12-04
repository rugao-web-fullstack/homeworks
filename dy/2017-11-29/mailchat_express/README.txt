一、模块划分：
    前台模块
    API 模块：

    app.use('/', require('./routers/main'));
    app.use('/api', require('./routers/api'));

二、前台路由 + 模板
    main 模块：
        /       首页
        /mail   邮件系统内容页

    API 模块：
        /               首页
        /register       用户注册
        /login          用户登录
        /writemail      写邮件
        /writemail/post 发邮件 
        /readmail       查看邮件