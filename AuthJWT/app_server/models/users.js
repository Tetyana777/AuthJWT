var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); //assigning jwt
var bcrypt = require('bcryptjs');
var secret = 'MY_SECRET';  //process.env.JWT_SECRET
SALT_ROUNDS = 10;


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true       
       },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});


//using bcryptjs(async) 
UserSchema.pre('save', function(next) {
    var user = this;

    //  hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

     bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) return next(err);

        // hash + new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

          user.password = hash;
          next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    bcrypt.compare({password: password}, this.password, function(err, isMatch) {
        if (err) return err;
        return(null, isMatch);
    });
};


UserSchema.methods.generateJWT = function(){
   return token = jwt.sign({
   username: this.username,
    id: this._id
         }, secret, {expiresInMinutes: '60' });  //see as option: process.env.JWT_SECRET
         
         };

module.exports = mongoose.model('User', UserSchema);




