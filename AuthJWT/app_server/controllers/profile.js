var User = require('../models/users');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var expressJWT = require('express-jwt');
var auth = require('../controllers/user');


exports.userProfile = function(req, res, next) {
  auth(req, res, function(){
   if (!req.payload._id) {
    res.status(401).json({
      message : "Unauthorized Error!"
    });
  } else {
      User.findById({_id: req.payload._id}, function(err, user) {
       if (err) return next(err);
           });
      res.json({ user: user});
      };
  });
  
  };


