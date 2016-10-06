(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    function MenuDataService($http) {
        var md = this;

        md.getAllCategories = function() {
            return $http({
                type: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            });
        };

        md.getItemsForCategory = function(categoryShortName) {
            console.log('sn:', categoryShortName);
            return $http({
                type: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
                params: {
                    category: categoryShortName
                }
            });
        };
    }
})();