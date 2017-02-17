describe('interceptor response', function() {

    var interceptor, $q;

    beforeEach(module('app'));

    beforeEach(function() {
        $location = {
            path: {
                href: '/'
            }
        };

        module(function($provide) {
            $provide.value('$location', $location);
        });
    });

    beforeEach(inject(function(_interceptor_, _$q_) {
        interceptor = _interceptor_;
        $q = _$q_;
        spyOn($q, 'reject');
    }));

 
        it('should redirect to login page if with unauthorized access', function() {
            var response = {
                status: 401,
                rejection: {}
            };
            var promise = interceptor.responseError(response);
            expect($location.path).toBe('/login');
            expect($q.reject).toHaveBeenCalled();
        });
        
         it('should redirect to login page if only with 401 unauthorized status error', function() {
            var response = {
                status: 404,
                rejection: {}
            };
            var promise = interceptor.responseError(response);
            expect($location.path).toEqual('/');
            expect($q.reject).toHaveBeenCalled();
        });
        
        it('should redirect to login page if trying to access (protected) profile page', function() {
            var response = {
               str: 'user'
                 };
            var promise = interceptor.responseError(response);
            expect($location.path.indexOf(response.str)).toBe(false);
            expect($location.path).toBe('/login');
            expect($q.reject).toHaveBeenCalled();
        });
});

