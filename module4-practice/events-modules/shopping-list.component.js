(function() {
    'use strict';

    angular.module('shoppingList')
        .component('shoppingList', {
                templateUrl: './shopping-list.html',
                controller: ShoppingListComponentController,
                bindings: {
                    items: '<',
                    title: '@',
                    remove: '&'
                }
            });

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
})();