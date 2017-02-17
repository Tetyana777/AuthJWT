var User = require('../models/users');
var expressJWT = require('express-jwt'); //jwt validation
var passport = require('passport');
var secret = 'MY_SECRET';  //process.env.JWT_SECRET


//register API
exports.registerUsers = function(req, res, next){
        //validate fields
     if (!req.body.username) {
        return res.status(400).send('Username is required');
    }
     else if (!req.body.password) {
        return res.status(400).send('Password is required');
    }
    
    if (!req.body.email) {
        return res.status(400).send('Email is required');
    }
    
      
   //create user 
   var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;

    user.save(function(err) {
        if (err) return next(err);
        return res.json({token: user.generateJWT()});

    });
     
};

//login API 
exports.loginUsers = function(req, res, next){
    //validate fields
     if (!req.body.username) {
        return res.status(400).send('Username is required');
    }
     else if (!req.body.password) {
        return res.status(400).send('Password is required');
    }
    
        
  passport.authenticate('local', function(err, user, info){
    if (err) return next(err);

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};


var auth = expressJWT({
    secret: new Buffer('MY_SECRET', 'base64'),  // models/users.js -> generateJWT() for secret/or see process.env.JWT_SECRET
    userProperty: 'payload'
});




