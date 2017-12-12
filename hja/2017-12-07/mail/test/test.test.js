// test/test.js
const request = require('supertest');
const app = require('../src/email/app');
const mysql = require('mysql');
var assert = require('assert');
var cookies;
var debug =require('debug')('xxx');

describe('用户未登录时', function () {
  it('进入首页', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('主页') !== -1);
        done();
      });

  });

  it('进入登录页面', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('登录') !== -1);
        done();
      });
  });

  it('进入注册页面', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('注册') !== -1);
        done();
      });
  });


});
describe('数据库链接', function () {
  before(function (done) {
    //创建dmail
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });

    con.query('DROP DATABASE email', function (err) {
      debug(err);
      con.query('CREATE DATABASE email', function (err) {
        if(err) throw err;
        //断开
        con.end();
        done();
      });
    });
  });


  //链接email
  it('链接email数据库', function (done) {
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'email'
    });

    con.query('create table user (id int primary key auto_increment,username varchar(50)not null,password varchar(50)not null)', function (err) {
      if (err) throw err;

      // con.query("create table mail (id int primary key auto_increment, )")
      con.query('create table mail (id int primary key auto_increment,receiver varchar(50)not null,sender varchar(50)not null,title varchar(50)not null,content varchar(1000)not null,is_read tinyint(12)not null)', function (err) {
        if (err) throw err;

        con.query('create table mailbox (id int primary key auto_increment,user int not null,mailbox varchar(50)not null)', function (err) {
          if (err) throw err;

          con.query('create table mail_emailbox (id int primary key auto_increment,mailbox int not null,mail int not null)', function (err) {
            if (err) throw err;

            con.end();
            done();
          });

        });
      });

    });

  });

  //进行注册测试
  it('注册正确测试', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'register', username: 'ui1', password: '123', email: 'ui1@qq.com' })
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal('/users/login', res.body);
        done();
      });
  });

  it('用户名可用测试', function (done) {
    request(app)
      .get('/api/users/ui2')
      .type('form')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal(1, res.body);
        done();
      });
  });

  it('注册正确测试2', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'register', username: 'ui2', password: '123', email: 'ui2@qq.com' })
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal('/users/login', res.body);
        done();
      });
  });

  it('用户被占用测试', function (done) {
    request(app)
      .get('/api/users/ui1')
      .type('form')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal(0, res.body);
        done();
      });
  });

  //进行登录测试
  it('登录正确测试', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'ui1', password: '123' })
      .expect(200, function (err, res) {
        if(err) throw err;
        cookies = res.headers['set-cookie'];
        assert.equal('/users/home', res.body);
        done();
      });
  });

  //进行登录时用户不存在测试
  it('用户名不存在', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'ui50', password: '123' })
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal(0, res.body);
        done();
      });
  });

  //进行登录时用户密码错误测试
  it('用户名密码错误', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'ui1', password: '23' })
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal(1, res.body);
        done();
      });
  });

  //登陆后测试index
  it('登录后，index自动跳转', function (done) {
    var req = request(app)
      .get('/');
    req.cookies = cookies;
    req
      .expect(302, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('users/home')!==-1);
        done();
      });
  });

  //登录后进入主页
  it('登陆后进入主页', function (done) {
    var req = request(app)
      .get('/users/home');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('用户主页') !== -1);
        done();
      });
  });

  //选择注销
  it('注销', function (done) {
    request(app)
      .get('/users/logout')
      .expect(302, function (err, res) {
        if(err) throw err;
        assert('/', res.headers.location);
        cookies = [];
        done();
      });
  });

  //注销后直接进入主页
  it('注销后直接进入主页将无法正常显示', function (done) {
    var req = request(app)
      .get('/users/home');
    req.cookies = cookies;
    req
      .expect(500, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('用户主页') === -1);
        done();
      });
  });

  //再次登录
  it('再次成功登录', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'ui1', password: '123' })
      .expect(200, function (err, res) {
        if(err) throw err;
        cookies = res.headers['set-cookie'];
        assert.equal('/users/home', res.body);
        done();
      });
  });

  //再次进入主页
  it('再次正确进入主页', function (done) {
    var req = request(app)
      .get('/users/home');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('用户主页') !== -1);
        done();
      });
  });

  //测试可用功能页面
  it('进入发送页面', function (done) {
    var req = request(app)
      .get('/mails/write');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('邮件编写服务') !== -1);
        done();
      });
  });

  it('进入查看页面', function (done) {
    var req = request(app)
      .get('/mails/read');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if(err) throw err;
        assert((res.text).indexOf('邮件查看服务') !== -1);
        done();
      });
  });

  it('进入详情查看页面', function (done) {
    var req = request(app)
      .get('/mails/detail/1');
    req.cookies = cookies;
    req
      .expect(200, function (err, res){
        if(err) throw err;
        assert((res.text).indexOf('查看详情') !== -1);
        done();
      });
  });

  //测试发送
  it('测试发送邮件', function (done) {
    request(app)
      .post('/api/mails')
      .type('form')
      .send({ action: 'post', sender: 'ui1', receiver: 'ui2', title: 'test', body: 'xxxxxxxxxx' })
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal('/users/home', res.body);
        done();
      });
  });

  //测试查看
  it('测试查看', function (done) {
    request(app)
      .get('/api/mails/ui2')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal('ui2', res.body[0].receiver);
        done();
      });
  });

  //测试详情查看
  it('测试详情查看', function (done) {
    request(app)
      .get('/api/mails/detail/1')
      .expect(200, function (err, res) {
        if(err) throw err;
        assert.equal(1, res.body[0].id);
        done();
      });
  });

  // after(function (done) {
  //   var con = mysql.createConnection({
  //     host: process.env.MYSQL_HOST,
  //     user: process.env.MYSQL_USERNAME,
  //     password: process.env.MYSQL_PASSWORD
  //   });

  //   con.query('DROP DATABASE email', function (err) {
  //     if (err) throw err;
  //     con.end();
  //     done();
  //   });
  // });

});


















