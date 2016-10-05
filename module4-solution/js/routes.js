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
                template: 'home now!'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: './templates/categories.template.html',
                controller: 'CategoryCtrl as cat',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('item', {
                url: '/item',
                template: 'you got items'
            });
    }
})();