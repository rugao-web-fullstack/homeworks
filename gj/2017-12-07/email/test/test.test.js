var request = require('supertest');
var app = require('../src/app');
// var assert = require('assert');
var debug = require('debug')('log');


//路由测试
describe('url test', function () {
  //主页面
  it('index should respond with html', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        debug('log:'+res);
        done();//处理异步，此it执行完毕才执行的下面的it
      });
  });
  //登录页面
  it('login should respond with html', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        debug('log:'+res);
        done();
      });
  });
  //注册页面
  it('reister should respond with html', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        debug('log:'+res);
        done();
      });
  });

});




