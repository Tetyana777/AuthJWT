angular.module('app')
        .factory('authentication', ['$localStorage','$http', '$window', function($localStorage, $http, $window){
                return {
                    saveToken: function(token) {
                     $localStorage.token = token;
                        },
       
                    getToken: function() {
                        return $localStorage.token;                   
                        },
               
               deleteToken: function() {
                   return $localStorage.$reset($localStorage.token);
                   
               },
              
               login: function(user) {
               return $http.post('/login', user).success(function(data) {
                saveToken(data.token);
                 })
                 .error(function(err){
                      return err;
                    });
                   },
                   
                 logout: function() {
                    return $http.get('/profile').success(function(data) {
                    deleteToken(data.token);
                    $http.defaults.headers.common.Authorization = '';
                        })
                     .error(function(err){
                      return err;
                    });               
                },  
                   
                   loggedIn: function() {
                     var token = getToken();
                     if(token){
                          var payload = token.split('.')[1];
                          return JSON.parse($window.atob(payload));
                     } else {
                         return false;
                             }
                     }

                };
                              
        }
        ]);

           