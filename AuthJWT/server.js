var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var passport = require('passport');
var userCtrl = require('./app_server/controllers/user');
var profileCtrl = require('./app_server/controllers/profile');
var authCtrl = require('./app_server/controllers/passport');


mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  log.info("Connection succeeded");
 });
 
var app = express();
//var app = module.exports.app = exports.app = express();  -> gulpfile.js

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(passport.initialize());

var router = express.Router();


router.route('/login')
        .post(userCtrl.loginUsers);

 router.route('/register')
        .post(userCtrl.registerUsers);
 


//getting to private profile -> authorization required JWT(payload)
router.route('/user')
          .get(authCtrl.isBearerAuthenticated, profileCtrl.userProfile);
  
app.use('/api', router);

app.listen(port, function(){
    log.info('Express server listening on port 8383');
});


/* for 'tests/app_server/test_express.js' testing purposes
 var server = app.listen(port, function(){
    log.info('Express server listening on port 8080');
});

module.exports = server;

*/

module.exports = app;