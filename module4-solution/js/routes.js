(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: './templates/categories.template.html',
                controller: 'CategoryMainCtrl as cat',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('item', {
                url: '/item/{short_name}',
                templateUrl: './templates/items.template.html',
                controller: 'ItemsMainCtrl as it',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.short_name);
                    }]
                }
            });
    }
})();