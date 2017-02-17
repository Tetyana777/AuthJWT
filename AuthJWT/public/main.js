'use strict';
angular
  .module('app', ['ngStorage'])
  .config(function ($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$injector', '$location', function($q, $injector, $location) {
    return {
      request: function(req) {
        if($location.path().indexOf('profile') > -1) {
        return $injector.get('authentication').getToken().then(function(req){
          req.headers.Authorization = 'Bearer '+ authentication.getToken();
        });
        }
       return req;
    },
     
     responseError: function(rejection) {
        if (rejection.status === 401 && $location.path().indexOf('profile') === -1) {
          return $location.path('/login');
        }
         return $q.reject(rejection);
    }       
      
    };
  }]);
});
   
 



