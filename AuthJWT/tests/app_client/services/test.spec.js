//testing $http.post() in authentication.login()
describe('authentication', function() {
    beforeEach(module('app'));
    var authentication;
    var $httpBackend;
    var url;
beforeEach(inject(function($injector) {
 authentication= $injector.get('authentication');
$httpBackend = $injector.get('$httpBackend');
url = '/login';
$httpBackend.when('POST', url).respond({
});
}));

afterEach(function() {
$httpBackend.verifyNoOutstandingExpectation();
$httpBackend.verifyNoOutstandingRequest();
});
it('should make a POST request', function() {
    var user = {username: 'tania', password:'bbbb'};
    $httpBackend.expectPOST(url, user).respond(201, '');
    authentication.login(user);
    $httpBackend.flush();
});
});

//testing $http.get() in authentication.logout()
describe('authentication', function() {
    beforeEach(module('app'));
    var authentication;
var $httpBackend;
var url;
beforeEach(inject(function($injector) {
 authentication= $injector.get('authentication');
$httpBackend = $injector.get('$httpBackend');
url = '/profile';
$httpBackend.when('GET', url).respond({
});
}));

afterEach(function() {
$httpBackend.verifyNoOutstandingExpectation();
$httpBackend.verifyNoOutstandingRequest();
});
it('should make a GET request', function() {
    $httpBackend.expectGET(url);
    authentication.logout();
    $httpBackend.flush();
});
});
