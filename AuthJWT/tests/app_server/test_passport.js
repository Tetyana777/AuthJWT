var Strategy = require('passport-http-bearer').Strategy;
var User = require('./app_server/models/users');
var chai = require('chai');
chai.use(require('chai-passport-strategy'));
var expect = require('chai').expect;


describe('bearer strategy', function() {
   var token = 'bnvmfgyu';
   var strategy = new Strategy(
    function(token) {
     User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
);

  describe('handling a token authentication request with valid credentials in header', function() {
    var user = {username:'tania'};
    before(function() {
      chai.passport.use(strategy)
        .success(function(User) {
          user = User;
          done();
        })
        .req(function(req) {
          req.headers.authorization = 'Bearer bnvmfgyu';
        })
        .authenticate();
    });

    it('should provide user', function() {
      expect(user).to.be.an.object;
      expect(user.username).to.be.equal('tania');
    });

   });
});