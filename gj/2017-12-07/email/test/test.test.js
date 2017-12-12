var request = require('supertest');
var app = require('../src/app');
var mysql = require('mysql');
var assert = require('assert');
var debug = require('debug')('log');
var init = require('../src/db/db').init;
var cbDb = require('../src/db/db').cbDb;
var cbMannage = require('../src/operation/cb').cbMannage;


//数据库测试
describe('db test', function () {
  it('db should test cbFunc', function () {
    var entered = false;
    var func = cbDb();
    try {
      func(true);
    } catch (e) {
      entered = true;
    }
    assert(entered);
  });

  it('db should test cbFunc', function () {
    var func = cbDb();
    func(false);
  });

  it('db should connect to mysql', function (done) {
    init(function (con) {
      assert(con);
      con.end();
      done();
    });
  });
});

//CBmamnage回调函数测试
describe('mannage cb test', function () {
  it('mannage cb test ', function () {
    var func = cbMannage(function () { }, function (err) {
      if (err) {
        debug('log' + 'aaa');
        // console.log("aaa");
      }
    });
    assert(!func(new Error('bbb')));
  });
});



//user路由测试
describe('user url test', function () {
  //主页面
  it('index should respond with html', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('主页') !== -1);
        done();//处理异步，此it执行完毕才执行的下面的it
      });
  });
  //登录页面
  it('login should respond with html', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('登录') !== -1);
        done();
      });
  });
  //注册页面
  it('register should respond with html', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('注册') !== -1);
        done();
      });
  });

});

var cookies;

//用户功能测试
describe('user function test', function () {
  before(function (done) {
    //创建一个新的数据库链接
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });
    //先删除原有的数据库，然后再重新创建新的email数据库
    con.query('DROP DATABASE email', function () {
      con.query(' CREATE DATABASE email', function () {
        //断开这个mysql链接
        con.end();
        done();
      });
    });
  });

  //数据库表格创建
  it('create email tables', function (done) {
    //链接这个数据库
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'email'
    });
    con.query('CREATE table user (id int primary key auto_increment ,username varchar(64)not null ,password varchar(62)not null )', function (err) {
      if (err) throw err;
      // console.log('user table success!');
      debug('log :' + 'user table success!');
      con.query('CREATE table user_mailbox (id int primary key auto_increment , mailbox int(64)NOT NULL, user int(64)NOT NULL)', function (err) {
        if (err) throw err;
        // console.log('user_mailbox table success!');
        debug('log :' + 'user table success!');
        con.query('CREATE table mail (id int primary key auto_increment  ,  sender varchar(64)NOT NULL,receiver varchar(64)  NOT NULL,title varchar(1000) NOT NULL,content varchar(10000)  NOT NULL,iread tinyint(1) NOT NULL)', function (err) {
          if (err) throw err;
          // console.log('mail table success!');
          debug('log :' + 'user table success!');
          con.query('CREATE table mail_mailbox (id int primary key auto_increment  , mailbox int(64) NOT NULL,mail varchar(64) NOT NULL)', function (err) {
            if (err) throw err;
            // console.log('mail_mailbox table success!');
            debug('log :' + 'user table success!');
            con.end();
            done();
          });
        });
      });
    });
  });

  //注册部分
  //第一个用户注册
  it('register user1 should response mysql', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'register', username: 'user1', password: 'user1', mailbox: '1111' })
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('/users/login', res.body);
        done();
      });
  });

  //第二个用户注册，进行接下去的邮件操作
  it('register user2 should response mysql', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'register', username: 'user2', password: 'user2', mailbox: '2222' })
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('/users/login', res.body);
        done();
      });
  });

  //用户查重:重名情况
  it('check uer is it exit', function (done) {
    request(app)
      .get('/api/users/user1')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('0', res.body);
        done();
      });
  });
  //用户查重:不重名情况
  it('check uer is it exit', function (done) {
    request(app)
      .get('/api/users/user3')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('1', res.body);
        done();
      });
  });

  //登录部分
  it('login should response with mysql', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'user1', password: 'user1' })
      .expect(200, function (err, res) {
        if (err) throw err;
        cookies = res.headers['set-cookie'];
        assert.equal('/users/home', res.body);
        done();
      });
  });

  //用户名或者密码错误的测试
  it('wrong username test ', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'user3', password: 'user1' })
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal(0, res.body);
        done();
      });
  });
  it('wrong  password test', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'user1', password: 'user2' })
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal(0, res.body);
        done();
      });
  });
});



//mail路由测试
describe('mail url test', function () {
  //登录后进入用户主页
  it('userhome should respond with html', function (done) {
    var req = request(app)
      .get('/users/home');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('用户主页') !== -1);
        done();
      });
  });
  //邮件列表页面
  it('read should respond with html', function (done) {
    var req = request(app)
      .get('/mails/read');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('邮件列表') !== -1);
        done();
      });
  });
  //邮件详情页面
  it('readconetnt should respond with html', function (done) {
    var req = request(app)
      .get('/mails/readcontent/1');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('邮件详情') !== -1);
        done();
      });
  });
  //编写邮件页面
  it('send should respond with html', function (done) {
    var req = request(app)
      .get('/mails/write');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        if (err) throw err;
        assert((res.text).indexOf('编写邮件') !== -1);
        done();
      });
  });
  //选择注销返回主页面
  it('shot out', function (done) {
    request(app)
      .get('/mails/out')
      .expect(302, function (err, res) {
        if (err) throw err;
        assert('/', res.headers.location);
        cookies = [];
        done();
      });
  });
});

//邮件功能测试
describe('mail function test', function () {

  it('login should response with mysql', function (done) {
    request(app)
      .post('/api/users')
      .type('form')
      .send({ action: 'login', username: 'user1', password: 'user1' })
      .expect(200, function (err, res) {
        if (err) throw err;
        cookies = res.headers['set-cookie'];
        assert.equal('/users/home', res.body);
        done();
      });
  });

  //测试发送
  it('send  should response mysql ', function (done) {
    request(app)
      .post('/api/mails')
      .type('form')
      .send({ action: 'send', sender: 'user1', receiver: 'user2', title: 'test', content: 'testtesttesttest', iread: 0 })
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('/users/home', res.body);
        done();
      });
  });

  //查看邮件列表
  it('read  should response mysql', function (done) {
    request(app)
      .get('/api/read/user2')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('user2', res.body[0].receiver);
        done();
      });
  });

  //测试详情查看
  it('readcontent should response mysql', function (done) {
    request(app)
      .get('/api/readcontent/1')
      .expect(200, function (err, res) {
        if (err) throw err;
        assert.equal('1', res.body[0].id);
        done();
      });
  });

  after(function (done) {
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });

    con.query('DROP DATABASE email', function (err) {
      if (err) throw err;
      con.end();
      done();
    });
  });
});
