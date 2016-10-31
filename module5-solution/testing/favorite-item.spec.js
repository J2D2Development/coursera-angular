/*eslint-disable*/
describe('Check Menu Item Service Test', function() {
    var $httpBackend;

    beforeEach(module('common'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        SignUpService = $injector.get('SignUpService');

        $httpBackend
          .whenGET('https://mysterious-depths-84805.herokuapp.com/menu_items/A1.json')
          .respond ({
              short_name: 'A1',
              name: 'Won Ton Soup'
          });

        $httpBackend
          .whenGET('https://mysterious-depths-84805.herokuapp.com/menu_items/FAKE.json')
          .respond(function(method, url, data, headers) {
            //can return function with array- [statusCode, bodyText, data, responseText]
            return [500, 'body', {}, 'Server Error - No menu item found'];
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    }));

    it('Should return a menu item when valid short_name provided', function() {
        var item;
        SignUpService.getMenuItem('A1').then(function(response) {
            item = response;
        });

        $httpBackend.flush();

        expect(item.short_name).toBe('A1');
        expect(item.name).toBe('Won Ton Soup');
    });

    it('Should return error when invalid short_name provided', function() {
        var fakeItem;
        SignUpService.getMenuItem('FAKE')
            .then(function(response) {
                console.log('Error Test- shouldn not see this');
            },
            function(error) {
                fakeItem = error;
            });

        $httpBackend.flush();

        expect(fakeItem.statusText).toBe('Server Error - No menu item found');
        expect(fakeItem.status).toBe(500);
    });
});