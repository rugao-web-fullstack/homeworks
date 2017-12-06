const request = require('supertest');
const app = require('../src/app').app;

describe('GET /user', function() {
  it('should respond with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('POST /user', function() {
  it('should respond with json', function(done) {
    request(app)
      .post('/user')
      .type('form')
      .send({ name: 'tobi' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
