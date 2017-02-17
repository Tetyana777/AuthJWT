angular
        .module('app')
        .controller('loginCtrl', ['$scope','$http', '$localStorage', '$location', 'authentication', 
                                                      function($scope, $http, $localStorage, $location, authentication){
                $scope.user = {};
                $scope.submit = function(){
                $scope.usernameRequired = '';
                $scope.emailRequired = '';
                $scope.passwordRequired = '';
                  if(!$scope.user.username){
                      $scope.usernameRequired = 'Username is required!';
                      
                  };
                  if(!$scope.user.email){
                      $scope.emailRequired = 'Valid email address is required!';
                      
                  };
                   if(!$scope.user.password){
                      $scope.passwordRequired = 'Password is required!';
                      
                  };
                  
                  authentication
                          .login($scope.user)
                          .error(function(err){
                              return err;
                          })
                          .then(function(){
                              $location.path('/profile'); // to be changed
                          });
                             
                };
                
                $scope.isLoggedIn = function() {
                    authentication.loggedIn();
                };
                
                 $scope.logout = function() {
                            authentication
                             .logout()
                             .error(function(err){
                              return err;
                                 })
                             .then(function(){
                              $location.path('/');
                                 });
                        };
                
                
}]);

