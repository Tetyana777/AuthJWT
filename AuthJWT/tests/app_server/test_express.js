
var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });
  it('404 not found', function path(done) {
    request(server)
      .get('/api/register/')
      .expect(404, done);
  });
});

