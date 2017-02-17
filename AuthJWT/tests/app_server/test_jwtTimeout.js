var clock;
var sinon = require('sinon');
var should = require('should');
var jwt = require('./app_server/models/users');
var isBearerAuthenticated = require('./app_server/controllers/passport');

describe('Auth token expiration', function () {
    before(function () {
         clock = sinon.useFakeTimers();
    });
    after(function () {
          clock.restore();
    });

    it('should expire token after 1 hour', function (cb) {
          jwt(this._id, function (err, token) {
              should.not.exist(err);
              clock.tick(3600100);
              isBearerAuthenticated(token, function (err, done) {
                 should.not.exist(done);
                 should.exist(err);
                 });
           });
        cb();
       });
    
});
