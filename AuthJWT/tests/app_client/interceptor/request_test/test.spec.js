'use strict';

var httpProvider;

describe('interceptor request', function() {
   var authentication, $httpBackend, token;
    beforeEach(function() {
    module('app', function ($httpProvider) {
        httpProvider = $httpProvider;
       });
});

   beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
      token ='myToken';
      }));
     
   beforeEach(inject(function($injector) {
      authentication = function() {
        return $injector.get('authentication');        
      }
    })); 
    
    
    it('should have authentication service injected and defined', function () {
        var service = authentication();
        expect(service).toBeTruthy();
         });
         
     it('should set token properly upon login', function() {
      var service = authentication();
      expect(service.getToken()).toBeUndefined();
      service.saveToken(token);
      expect(service.getToken()).toBe(token);
    });

     it('should return ok response after setting token in the headers', function() {
        var service = authentication();
        service.saveToken(token);
        $httpBackend.when('GET', '/login', function(headers) {
          expect(headers.Authorization).toBe(token);
        }).respond(200, {name: 'login' });
      });
      
       it('should put a token in the http request headers when token is set', function() {
           var req = {
            headers: {
                Authorization: ''
            }
        };
         expect(req.headers).toBeUndefined();
         var service = authentication();
         var token = service.getToken();
         expect(req.headers['Authorization']).toBe('Bearer:'+ token);
      });

    
 });     



