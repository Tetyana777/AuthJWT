'use strict';

angular
  .module('app')
  .config(function ($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$injector', '$location', function($q, $injector, $location) {
    return {
      request: function(req) {
        if($location.path().indexOf('profile') > -1) {
         return $injector.get('authentication').getToken().then(function(){
          req.headers.Authorization = 'Bearer '+ authentication.getToken();
        });
        }
       return req;
    }
    };
  }]);
});
 
 
 //using authentication service without $location.storage  -- see authentication.js
angular.module('app')
        .factory('authentication', function(){
               var token;
                return {
                    saveToken: function(myToken) {
                    token = myToken;
                        },
       
                    getToken: function() {
                        return token;                   
                        }
                };
                              
        }
        );

           