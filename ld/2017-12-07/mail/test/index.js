var request = require('supertest');
var assert = require('assert');
var app = require('../src/app');

describe('', function () {
    it('test get /', function (done) {
        request(app)
            .get('/')
            .expect(200, function (err, res) {
                assert((res.text).indexOf('HOME') !== -1);
                done();
            });
    });
    it('test get /home', function (done) {
        request(app)
            .get('/home')
            .expect(200, function (err, res) {
                assert((res.text).indexOf('Email_Home') !== -1);
                done();
            });
    });
    it('test get /user/reg', function (done) {
        request(app)
            .get('/user/reg')
            .expect(200, function (err, res) {
                assert((res.text).indexOf('注册') !== -1);
                done();
            });
    });
    it('test get /user/login', function (done) {
        request(app)
            .get('/user/login')
            .expect(200, function (err, res) {
                assert((res.text).indexOf('登录') !== -1);
                done();
            });
    });
    it('test get /mail', function (done) {
        request(app)
            .get('/mail/info')
            .expect(200, function (err, res) {
                //console.log('1-res.text = '+res.text);
                assert((res.text).indexOf('邮件信息') !== -1);
                done();
            });
    });
    it('test get /mail/write', function (done) {
        request(app)
            .get('/mail/write')
            .expect(200, function (err, res) {
                assert((res.text).indexOf('写邮件') !== -1);
                done();
            });
    });
});