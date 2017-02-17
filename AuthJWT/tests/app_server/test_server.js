var chai = require('chai');
chai.use(chaiHttp);
var expect = require('chai').expect;


describe('Users', function() {
  it('should add a user on /login POST', function(){
  chai.request('http://localhost:8080')
  .put('/login/')
  .send({ password: '123', confirmPassword: '123' })
  .then(function (res) {
     expect(res).to.have.status(200);
  })
  .catch(function (err) {
     throw err;
  });
  });
  
  it('should get a user on /profile GET', function(){
  chai.request('http://localhost:8080')
  .get('/profile/')
  .send({ username:'tania', password: '123', confirmPassword: '123' })
  .then(function (res) {
     expect(res).to.have.status(200);
  })
  .catch(function (err) {
     throw err;
  });
  });
        
});



