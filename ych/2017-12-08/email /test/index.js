var request = require('supertest');
var assert = require('assert');
var app = require('../src/').app;
var mysql = require('mysql');
var basic = require('../src/connectServer');
describe('url', function(){
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('homepage') !== -1);
        done();
      });
  });
  it('get /user/login', function (done) {
    request(app)
      .get('/user/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('login') !== -1);
        done();
      });
  });
  it('get /user/register', function (done) {
    request(app)
      .get('/user/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('register') !== -1);
        done();
      });
  });
});
describe('db test', function(){
  before(function (done) {
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });
    con.query('drop database dmail', function () {
      con.query('create database dmail', function () {
        con.end();
        done();
      });
    });
  });
  it('connect to mysql', function (done) {
    basic(function (con) {
      assert(con);
      con.end();
      done();
    });
  });
  it('connect to dmail', function (done) {
    basic(function (con) {
      assert(con);
      con.end();
      done();
    }, 'dmail');
  });
});
