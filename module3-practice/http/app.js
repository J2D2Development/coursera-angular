(function() {
    'use strict';

    angular.module('app', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService);

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;
        var promise = MenuCategoriesService.getCategories();

        menu.categories = [];
        menu.items = [];

        promise.then(function(response) {
            menu.categories = response.data;
        })
        .catch(function(error) {
            console.log(error.message);
        });

        menu.getMenuItems = function(category) {
            var itemsPromise = MenuCategoriesService.getMenuItems(category);

            itemsPromise.then(function(response) {
                menu.items = response.data.menu_items;
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error.message);
            });
        };
    }

    MenuCategoriesService.$inject = ['$http'];
    function MenuCategoriesService($http) {
        var mcService = this;
        var baseUrl = 'http://davids-restaurant.herokuapp.com/categories.json';

        mcService.getCategories = function() {
            return $http({
                type: 'GET',
                url: baseUrl
            })
            .then(function success(response) {
                return response;
            }, function failure(response) {
                return response;
            });
        };

        mcService.getMenuItems = function(category) {
            var parameters = {
                "category": category
            };

            return $http({
                type: 'GET',
                url: 'http://davids-restaurant.herokuapp.com/menu_items.json',
                params: parameters
            })
            .then(function success(response) {
                return response;
            }, function failure(response) {
                return response;
            });
        };
    }
})();