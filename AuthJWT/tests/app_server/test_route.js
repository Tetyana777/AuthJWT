var express = require('express');
var request = require('supertest');
var app = require('./server');
var agent = request.agent(app);
var userCtrl = require('./app_server/controllers/user');
var router = express.Router();
app.use(router);
var sinon = require('sinon');
var authCtrl = require('./app_server/controllers/passport');

describe('express routes', function() {
 var isAuthenticatedStub;
 before(function() {
     var isAuthenticatedStub = sinon.stub(authCtrl, 'isBearerAuthenticated',  function(req, res, next){
         res.body.token='aaa';
            next();
     });
     
});

 describe('register routing path', function() {
  it('should POST /register with user credentials', function() {
   request(app)
  .post('/register')
  .send({username:'tamnia', password:'lll'})
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });
});
});

describe('login routing path', function() {
   var token = {};
   it('should POST /login with user credentials and get token in return', function(done) {
   agent
  .post('/login')
  .send({username:'tamnia', password:'lll'})
  .expect(200, function(err, res) {
      expect.res.body.token.to.equal('aaa'); 
           });
      done();
      });
}); 

   
describe('profile routing path', function() {
    var token = {};
    it('should GET /profile with token bearer authorization', function(done) {
   agent
  .get('/profile')
  .set('Authorization', token)
  .expect(token, done)
    });
 });

});
