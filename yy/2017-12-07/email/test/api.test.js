var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');
var debug = require('debug')('xxx');
describe('页面api测试', function () {
//用户注册
  it('post /users/register', function (done) {
    request(app)
      .post('/users/register')
      .send({username:'qweerty',email:'qwe@qq.com',password:'789'})
      .expect(200, function (err,res) {
        debug('log:' + '注册成功');
        debug('log:' + res.text);
        assert((res.text).indexOf('success')!==-1);
        done();
      });
  });
  it('post /users/register', function (done) {
    request(app)
      .post('/users/register')
      .send({username:'yya',email:'yya@qq.com',password:'789'})
      .expect(200, function (err,res) {
        debug('log:' + '已存在的用户名，注册失败');
        debug('log:' + res.text);
        assert((res.text).indexOf('failure')!==-1);
        done();
      });
  });
  //用户登录
  it('post /users/login', function (done) {
    request(app)
      .post('/users/login')
      .send({username:'yya',password:'123'})
      .expect(200, function (err,res) {
        debug('log:' + '已存在的用户名，登录成功');
        debug('log:' + res.text);
        assert((res.text).indexOf('success')!==-1);
        done();
      });
  });
  it('post /users/login', function (done) {
    request(app)
      .post('/users/login')
      .send({username:'yya',password:'1234'})
      .expect(200, function (err,res) {
        debug('log:' + '已存在的用户名，但是密码错误，登录失败');
        debug('log:' + res.text);
        assert((res.text).indexOf('failure')!==-1);
        done();
      });
  });
  it('post /users/login', function (done) {
    request(app)
      .post('/users/login')
      .send({username:'yy',password:'123'})
      .expect(200, function (err,res) {
        debug('log:' + '不存在的用户名，登录失败！');
        debug('log:' + res.text);
        assert((res.text).indexOf('failure')!==-1);
        done();
      });
  });

});
