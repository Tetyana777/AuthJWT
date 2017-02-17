var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new LocalStrategy(
  function(username, password) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return cb(err); }
      if (!user) {
        return cb(null, false, { message: 'User not found' });
      }
      if (!user.comparePassword(password)) {
        return cb(null, false, { message: 'Password is wrong' });
      }
      return cb(null, user);
    });
  }
));

passport.use(new BearerStrategy(
  function(token, cb) {
    Token.findOne({ value: token }, function (err, token) {
      if (err) { return cb(err); }
      if (!token) { return cb(null, false); }
      return cb(null, token, { scope: '*' });
    });
    
    User.findOne(token.userID, function (err, user) {
        if (err) { return cb(err); }

        if (!user) { return cb(null, false, {message:'Unknown user!'}); }
        cb(null, user, { scope: '*' });
      });
  }
));
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
