angular
  .module('app')
  .factory('interceptor', ['$q', '$location', function($q, $location) {
    return {
       responseError: function(rejection) {
        $location.path = '/';
        if (rejection.status === 401 && $location.path.indexOf('profile') === -1) {
         $location.path = '/login';
        }
         return $q.reject(rejection);
    }       
      
    };
  
}]);