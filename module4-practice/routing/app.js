(function() {
    'use strict';

    angular.module('app', ['ui.router'])
        .config(RoutesConfig)
        .service('WeightLossFilterService', WeightLossFilterService)
        .controller('HomeCtrl', HomeCtrl)
        .controller('AboutCtrl', AboutCtrl)
        .component('shoppingList', ShoppingListComponentController);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h2>Welcome Home</h2>',
                controller: 'HomeCtrl as home'
            })
            .state('about', {
                url: '/about',
                template: '<h2>About Us</h2>',
                controller: 'AboutCtrl as about'
            })
            .state('mainList', {
                url: '/main-list',
                templateUrl: './main-shoppinglist.template.html',
                controller: 'ShoppingListComponentController as $ctrl'
            });
    }

    function HomeCtrl() {
        var home = this;
        console.log(home);
    }

    function AboutCtrl() {
        var about = this;
        console.log(about);
    }

    ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
    function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService) {
        var $ctrl = this;
        var warningEle = $element.find('.errorOp');
        var totalItems;

        $ctrl.$onInit = function() {
            totalItems = 0;
        };

        $ctrl.$doCheck = function() {
            if($ctrl.items.length !== totalItems) {
                totalItems = $ctrl.items.length;

                $rootScope.$broadcast('shoppinglist:processing', {on: true});

                var promises = [];
                $ctrl.items.forEach(function(item) {
                    promises.push(WeightLossFilterService.checkName(item.name));
                });

                $q.all(promises)
                    .then(function(result) {
                        console.log('no cookies!!!');
                        warningEle.removeClass('errorOpShow');
                    })
                    .catch(function(result) {
                        console.log('cookies found');
                        warningEle.addClass('errorOpShow');
                    })
                    .finally(function(result) {
                        console.log('all done- hide spinner');
                        $rootScope.$broadcast('shoppinglist:processing', {on: false});
                    });
            }
        }
    }

    WeightLossFilterService.$inject = ['$q'];
    function WeightLossFilterService($q) {
        var wl = this;

        wl.checkName = function(name) {
            return $q(function(resolve, reject) {
                setTimeout(function() {
                    if(name.indexOf('cookie') !== -1) {
                        reject('Cookies found');
                    } else {
                        resolve('No cookies!');
                    }
                }, 300);
            })
        };
    }
})();