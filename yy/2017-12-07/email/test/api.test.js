var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');
var cb = require('../src/operations/cb').cb;
var debug = require('debug')('xxx');
describe('测试err',function(){
  it('test cb',function(){
    let cbFunc=cb();
    assert(!cbFunc(new Error('Test Error')));
    assert(!cbFunc(true));
  });
});
describe('用户api测试', function () {
//用户注册
  it('post /users/register', function (done) {
    request(app)
      .post('/users/register')
      .send({username:'qweertyr35184',email:'qwe@qq.com',password:'789'})
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


describe('邮件api测试', function () {
//发送邮件
  it('post /emails/write', function (done) {
    request(app)
      .post('/emails/write')
      .send({sender:'yya@qq.com',receiver:'jjm@qq.com',title:'hello',content:'hello yangyan'})
      .expect(200, function (err,res) {
        debug('log:' + '收件人存在，发送成功');
        debug('log:' + res.text);
        assert((res.text).indexOf('success')!==-1);
        done();
      });
  });
  it('post /emails/write', function (done) {
    request(app)
      .post('/emails/write')
      .send({sender:'yya@qq.com',receiver:'null@qq.com',title:'hello',content:'hello yangyan'})
      .expect(200, function (err,res) {
        debug('log:' + '收件人不存在，发送失败');
        debug('log:' + res.text);
        assert((res.text).indexOf('failure')!==-1);
        done();
      });
  });
  this.timeout(5000);
  //查看邮件
  it('get /emails/read', function (done) {
    request(app)
      .get('/emails/read')
      //.send({user:'yya'})
      .expect(200, function (err,res) {
        debug('log:' + res.text);
        assert((res.text).indexOf('邮件编号')!==-1);
        done();
      });
  });

});
