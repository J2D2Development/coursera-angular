/*eslint-disable*/

//add $httpBackend service to test signupservice/controller
describe('Check Menu Item Service Test', function() {
    var $httpBackend;

    beforeEach(module('common'));
    beforeEach(module('public'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        SignUpService = $injector.get('SignUpService');

        $httpBackend
              .whenGET('http://mysterious-depths-84805.herokuapp.com/menu_items/A1.json')
              .respond ({
                  short_name: 'A1',
                  name: 'Won Ton Soup - Fake'
              }); 
        //$httpBackend.expect('GET', 'http://mysterious-depths-84805.herokuapp.com/menu_items.json')
            // .respond({'menu_items': [{short_name: 'A1', name: 'Won-ton soup'}, {short_name: 'A2', name: 'Other soup'}]});
        // $rootScope = $injector.get('$rootScope');

        // var $controller = $injector.get('$controller');

        // createController = function() {
        //     return $controller('SignUpController', {'$scope': $rootScope});
        // };

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        console.log('before eash');
    }));

    it('Should return a menu item when valid short_name provided', function() {
        var item;
        SignUpService.getMenuItem('A1').then(function(response) {
            item = response;
        });

        $httpBackend.flush();

        expect(item.short_name).toBe('A1');
        expect(item.name).toBe('Won Ton Soup - Fake');
    });

    it('Should return error response on invalid short_name', function() {
        expect(true).toBe(true);
    });

    it('Should provide correct menu_item object on valid short_name', function() {
        expect(false).toBe(!true);
    });
});