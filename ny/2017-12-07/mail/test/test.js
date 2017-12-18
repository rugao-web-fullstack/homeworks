var request = require('supertest');
var assert = require('assert');
var app = require('../src/app').app;
var mysql = require('mysql');
var base = require('../src/db/base');


describe('url', function () {
  it('get /', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('index') !== -1);
        done();
      });
  });
  it('get /users/register', function (done) {
    request(app)
      .get('/users/register')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('register') !== -1);
        done();
      });
  });
  it('get /users/login', function (done) {
    request(app)
      .get('/users/login')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('login') !== -1);
        done();
      });
  });
  it('get /users/logout', function (done) {
    request(app)
      .get('/users/logout')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('index') !== -1);
        done();
      });
  });
  it('get /main', function (done) {
    request(app)
      .get('/main')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('main') !== -1);
        done();
      });
  });
  it('get /mails', function (done) {
    request(app)
      .get('/mails')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('list') !== -1);
        done();
      });
  });
  it('get /mails/write', function (done) {
    request(app)
      .get('/mails/write')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('write') !== -1);
        done();
      });
  });
  it('get /mails/1', function (done) {
    request(app)
      .get('/mails/1')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('read') !== -1);
        done();
      });
  });
  it('get /mails/ny', function (done) {
    request(app)
      .get('/mails/ny')
      .expect(200, function (err, res) {
        assert((res.text).indexOf('404') !== -1);
        done();
      });
  });
});
describe('mydb connected', function () {
  before(function (done) {
    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });
    con.query('DROP DATABASE mydb', function () {
      con.query('CREATE DATABASE mydb', function () {
        con.end();
        done();
      });
    });
  });
  it('connect to mysql', function (done) {
    base(function (con) {
      assert(con);
      con.end();
      done();
    });
  });
  it('connect to mydb', function (done) {
    base(function (con) {
      assert(con);
      con.end();
      done();
    }, 'mydb');
  });
});

