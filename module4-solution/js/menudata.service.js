(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    function MenuDataService($http, $rootScope, $timeout) {
        var md = this;

        md.getAllCategories = function() {
            var timer = $timeout(function() {
                $rootScope.$broadcast('shoppinglist:processing', {on: true});
            }, 300);
            
            return $http({
                type: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            })
            .error(function() {
                console.log('Network Error- please try again later');
                $rootScope.$broadcast('shoppinglist:processing', {on: false});
            })
            .finally(function() {
                $timeout.cancel(timer);
                $rootScope.$broadcast('shoppinglist:processing', {on: false});
            });
        };

        md.getItemsForCategory = function(categoryShortName) {
            var timer = $timeout(function() {
                $rootScope.$broadcast('shoppinglist:processing', {on: true});
            }, 300);

            return $http({
                type: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
                params: {
                    category: categoryShortName
                }
            })
            .error(function() {
                console.log('Network Error- please try again later');
                $rootScope.$broadcast('shoppinglist:processing', {on: false});
            })
            .finally(function() {
                $timeout.cancel(timer);
                $rootScope.$broadcast('shoppinglist:processing', {on: false});
            });
        };
    }
})();