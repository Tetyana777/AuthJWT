angular
        .module('app')
        .service('authentication', ['$http', function($http) {
return {
//testing $http.post() in login()
login: function(user) {
  return $http.post('/login', user);  
},

//testing $http.get() in logout()
logout: function() {
return $http.get('/profile');
}

};
}]);